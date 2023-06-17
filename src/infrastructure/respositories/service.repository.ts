import { injectable } from "inversify";
import { BaseRepository, IBaseRepository } from "../../shared/repositories/base.repository";
import { ENTITY, IServiceModel } from "../../models/service.model";


export interface IServiceRepository extends IBaseRepository<IServiceModel> {

}

@injectable()
export class ServiceRepository extends BaseRepository<IServiceModel> implements IServiceRepository {

    constructor() {
        super(ENTITY);
    }

}
