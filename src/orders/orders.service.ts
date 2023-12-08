import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "./entities/orders.entity";
import { FindManyOptions, In, Repository } from "typeorm";
import * as moment from 'moment'
import { ServiceProductService } from "src/service-products/service-products.service";

@Injectable()
export class OrderService {
    constructor(@InjectRepository(OrdersEntity)
    private orderRepo: Repository<OrdersEntity>,
        private serviceProductService: ServiceProductService
    ) { }


    async get(condition?: FindManyOptions<OrdersEntity>) {
        return await this.orderRepo.find(condition)
    }

    async create(data) {
        const f = await this.orderRepo.find({ order: { 'datetime': -1 }, 'take': 1 })
        if (f.length) {
            if (moment(data.datetime).diff(f[0].datetime, 'h') < 3) throw new HttpException('Wait' + moment(data.datetime).diff(f[0].datetime, 'm') + 'minutes', HttpStatus.BAD_REQUEST)
        }

        const servs = await this.serviceProductService.get({ where: { id: In(data.services) }, select: ['name', 'pricing', 'id'] })
        if (servs.length !== data.services.length) {
            throw new HttpException('please check service ids again', HttpStatus.BAD_REQUEST)
        }
        let c = 0
        for (const x of servs) {
            c += x.pricing
        }
        data.totalfee = c
        data.service = servs
        return await this.orderRepo.insert(data)
    }

    async update(data, condition) {
        const f = await this.orderRepo.find({ where: condition, order: { 'datetime': -1 }, 'take': 1 })
        if (f.length) {
            if (moment(data.datetime).diff(f[0].datetime, 'h') < 3) throw new HttpException('Wait' + moment(data.datetime).diff(f[0].datetime, 'm') + 'minutes', HttpStatus.BAD_REQUEST)
        } else {
            throw new HttpException('record does not exist', HttpStatus.BAD_REQUEST)
        }

        const servs = await this.serviceProductService.get({ where: { id: In(data.services) }, select: ['name', 'pricing', 'id'] })
        if (servs.length !== data.services.length) {
            throw new HttpException('please check service ids again', HttpStatus.BAD_REQUEST)
        }
        let c = 0
        for (const x of servs) {
            c += x.pricing
        }
        data.totalfee = c
        data.service = servs

        return await this.orderRepo.update(data, condition)
    }

    async delete(condition) {
        await this.orderRepo.delete(condition)
    }
}