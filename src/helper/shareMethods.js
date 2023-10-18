const Ajv= require('ajv');
const ajv=new Ajv();

/**
 * 
 * @param {*} schema 
 * @param {*} body 
 * @returns 
 */

const validateInputs=(schema,body)=>{
    const validate=ajv.compile(schema);
    const valid=validate(body);
    if(!valid){
        return{
            status:400,
            error:validate.errors
        }
    }
    return {
        status:200,
        errors:""
    }
};

module.exports={validateInputs};