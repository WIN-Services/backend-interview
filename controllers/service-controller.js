const Services = require('../schema/models/services')
const BaseController = require('./base-controller')

module.exports = class ServiceController extends BaseController {
    constructor() {
        super(Services)
        this.Model = Services;
    }

    async _validate(options) {
        const dto = options.body;
        const ve = [];
        if (!dto.name || typeof dto.name != 'string')
            ve.push(`service name must be valid string.`)
        else if (dto.name.length > 255)
            ve.push(`service name must be less than 255 characters.`)

        if (!dto.fee || typeof dto.fee != 'number')
            ve.push(`service fee must be a valid integer`)

        //check for existing services because service name has a unique constraint
        if (!ve.length) {
            const existingService = await this.Model.forge({ name: dto.name }).fetch({ limit: 1 })
            if (existingService)
                ve.push(`service with name ${dto.name} already exist.`)
        }

        return ve;
    }

    _mapToDBObj(options) {
        const obj = options.obj;
        const dto = options.body;
        if(dto.fee)
            obj.set('fee', dto.fee);
        if(dto.name)
            obj.set('name', dto.name);
        return obj;
    }
}