import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceProductsEntity } from "./entities/service-product.entity";
import { FindManyOptions, Repository } from "typeorm";

@Injectable()
export class ServiceProductService {
    constructor(@InjectRepository(ServiceProductsEntity)
    private repo: Repository<ServiceProductsEntity>) {
    }

    async get(condition?: FindManyOptions<ServiceProductsEntity>) {
        return await this.repo.find(condition)
    }

    async create(data) {
        return await this.repo.insert(data)
    }

    async update(data, condition) {
        return await this.repo.update(condition, data)
    }

    async delete(condition) {
        return await this.repo.delete(condition)
    }
}