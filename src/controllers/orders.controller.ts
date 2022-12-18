import Bluebird from "bluebird";
import * as express from 'express';
import { Repository } from "sequelize-typescript";
import { Op } from "sequelize";
import { Service, Order, ServiceOrder } from '../models';

export default class OrdersController {
    public path = '/orders';
    public router = express.Router();

    private readonly orderRepository!: Repository<Order>;
    private readonly serviceRepository!: Repository<Service>;
    private readonly serviceLookupRepository: Repository<ServiceOrder>;

    constructor(serviceRepo: Repository<Service>, orderRepo: Repository<Order>, serviceLookupRepo: Repository<ServiceOrder>) {
        this.serviceRepository = serviceRepo;
        this.orderRepository = orderRepo;
        this.serviceLookupRepository = serviceLookupRepo;
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.post(this.path, this.create);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    private checkIsOrderAlreadyExists = async (userId: number, serviceId: number) => {
        console.log('begin checking')
        // const threeHoursAgo = new Date(Date.now() - 1000 * 60 * 60 * 3);
        const threeHoursAgo = new Date(Date.now() - 1000 * 60 * 1);
        const previousOrder = await this.orderRepository.findOne({
            where: {
                userId
            },
            order: [['createdAt', 'DESC']]
        })

        console.log(previousOrder, 'previousOrder checking')

        if (!previousOrder) return false;

        const svcOrder = await this.serviceLookupRepository.findOne({
            where: {
                [Op.and]: [
                    {
                        orderId: previousOrder!.id,
                        serviceId,
                    },
                    {
                        [Op.or]: [
                            {
                                createdAt: {
                                    [Op.gte]: threeHoursAgo
                                }
                            },
                            {
                                updatedAt: {
                                    [Op.gte]: threeHoursAgo
                                }
                            }
                        ]
                    }
                ]
            }
        });

        return svcOrder && svcOrder.serviceId === serviceId;
    }

    public getAll = async (request: express.Request, response: express.Response) => {
        const { limit = 100, offset = 0 } = request.params
        const data = await this.orderRepository.findAndCountAll({ limit: + limit, offset: +offset, include: [this.serviceRepository] })
        response.json(data);
    }

    public getById = async (request: express.Request, response: express.Response) => {
        const { id } = request.params;
        const data = await this.orderRepository.findByPk(id, { include: [this.serviceRepository] });
        if (!data) {
            return response.status(404).send({ message: `no order found with given id: ${id}` });
        }
        response.json(data);
    }

    public create = async (request: express.Request, response: express.Response) => {
        const data = request.body;
        if (await this.checkIsOrderAlreadyExists(+data.userId, +data.serviceId)) {
            return response.status(400).send({
                message: 'order with given service id already exits'
            })
        };
        const { id } = await this.orderRepository.create(data);
        await this.serviceLookupRepository.create({ orderId: id, serviceId: +data.serviceId });
        const result = await this.orderRepository.findByPk(id, { include: [this.serviceRepository] })
        response.json(result);
    }

    public update = async (request: express.Request, response: express.Response) => {
        const { id } = request.params
        const data = request.body;
        if (await this.checkIsOrderAlreadyExists(+data.userId, data.serviceId)) {
            return response.status(400).send({
                message: 'update not allowed until 3 hours'
            })
        };
        await this.orderRepository.update(data, {
            where: {
                id
            }
        })
        response.json({ id, ...data });
    }

    public delete = async (request: express.Request, response: express.Response) => {
        const { id } = request.params
        const data = await this.orderRepository.findByPk(id, { include: [this.serviceRepository] });
        if (data) {
            await Bluebird.map(
                data.services,
                async (service) => {
                    await this.serviceLookupRepository.destroy({
                        where: {
                            serviceId: service.id,
                            orderId: data.id
                        }
                    });
                },
                { concurrency: 2 }
            );

            await this.orderRepository.destroy({
                where: {
                    id: data.id
                }
            });
        }

        response.sendStatus(data ? 200 : 404);
    }
}