const { required } = require('joi');
const Joi = require('joi');

const ordersDetailsSchema = Joi.object({
    // job:Joi.object().keys({
    //     type: Joi.string().required().valid('PIPELINE_EXECUTE','PIPE_SINK_SCHEDULE','LIVE_DATASOURCE_REFRESH'),
    //     id: Joi.string().required(),
    //     input: {
    //         slug: Joi.string().required(),
    //         response_mode: Joi.string(),
    //         batch_size: Joi.number() 
    //     }
    // }),
    // name:Joi.string().required(),
    // schedule: Joi.array().items(Joi.object({
    //     type: Joi.string().required().valid('cron','simple'),
    //     trigger_id:Joi.string().allow(null),
    //     start: Joi.alternatives().conditional('type',{not:'simple', then:Joi.string().allow("").required()}),
    //     end: Joi.alternatives().conditional('type',{not:'simple', then:Joi.string().allow("").required()}),
    //     cron: Joi.alternatives().conditional('type',{not:'simple', then:{
    //         day_of_week: Joi.array().items(Joi.string()),
    //         type: Joi.string().required(),
    //         hour: Joi.number().required(),
    //         minutes: Joi.number().required(),
    //         day: Joi.number()
    //     }}),
    //     cron_timezone:  Joi.alternatives().conditional('type',{not:'simple', then:Joi.string().required().allow(null)}),
    //     punctual: Joi.boolean().required(),
    //     when: Joi.alternatives().conditional('type',{is:'simple', then:Joi.string()})
    // })).required()
})

module.exports=ordersDetailsSchema