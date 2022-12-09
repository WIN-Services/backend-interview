const Ajv = require('ajv')

const ajv = new Ajv({
    verbose: true, allErrors: true, $data: true,
})

require('ajv-formats')(ajv);
require('ajv-errors')(ajv, { singleError: true });
require('ajv-keywords')(ajv);


const isSchemaValid = ({schema, data}) => {
    const validator = ajv.compile(schema);
    const isValid = validator(data)

    if(!isValid){
        return {errors: validator.errors}
    }

    return {data}
}

module.exports = {
    isSchemaValid
}