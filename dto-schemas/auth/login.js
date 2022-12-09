const login = {
    title: 'login authentication of user',
    description: 'A HTTP POST Request',
    type: 'object',
    properties: {
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        }
    },
    required: ['username', 'password'],
}

module.exports = login