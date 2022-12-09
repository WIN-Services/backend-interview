const getById = {
    title: 'login authentication of user',
    description: 'A HTTP POST Request',
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
         
    },
    required: ['id'],
}

module.exports = getById