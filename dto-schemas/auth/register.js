const register = {
    title: 'register authentication of user',
    description: 'A HTTP POST Request',
    type: 'object',
    properties: {
        username: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
        }
    },
    required: ['username', 'email', 'password'],
}

module.exports = register