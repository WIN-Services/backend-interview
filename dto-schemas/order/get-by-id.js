const getById = {
    title: 'login authentication of user',
    description: 'A HTTP POST Request',
    type: 'object',
    properties: {
        id: {
            type: ['string', 'null'],
        },
        new: {
            type: ['string', 'null'],
        },
        category: {
            type: ['string', 'null'],
        },
    },
    required: ['id'],
}

module.exports = getById