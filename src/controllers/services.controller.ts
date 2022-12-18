import * as express from 'express';
import { Repository } from "sequelize-typescript";
import { Service, Order } from '../models';


export default class ServicesController {
    public path = '/services';
    public router = express.Router();

    private readonly orderRepository!: Repository<Order>;
    private readonly serviceRepository!: Repository<Service>;

    constructor(serviceRepo: Repository<Service>, orderRepo: Repository<Order>) {
        this.serviceRepository = serviceRepo;
        this.orderRepository = orderRepo;
        this.intializeRoutes();
    }


    public intializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.post(this.path, this.create);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    public getAll = async (request: express.Request, response: express.Response) => {
        const { limit = 100, offset = 0 } = request.params
        const data = await this.serviceRepository.findAndCountAll({ limit: + limit, offset: +offset })
        response.json(data);
    }

    public getById = async (request: express.Request, response: express.Response) => {
        const { id } = request.params;
        const data = await this.serviceRepository.findByPk(id, { include: [this.orderRepository] });
        if (!data) {
            return response.status(404).send({ message: `no service found with given id: ${id}` });
        }
        response.json(data);
    }

    public create = async (request: express.Request, response: express.Response) => {
        const data = request.body;
        const created = await this.serviceRepository.create(data);
        response.json(created);
    }

    public update = async (request: express.Request, response: express.Response) => {
        const { id } = request.params
        const data = request.body;
        await this.serviceRepository.update(data, {
            where: {
                id
            }
        })
        response.json({ id, ...data });
    }

    public delete = async (request: express.Request, response: express.Response) => {
        const { id } = request.params
        await this.serviceRepository.destroy({
            where: {
                id: +id
            }
        });
        response.sendStatus(200)
    }
}