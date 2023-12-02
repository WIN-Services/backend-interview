const pipeline = [{
    $facet: {
        lastCreated: [
            {
                $match: { is_active: true }
            },
            { $sort: { created_At: -1 } },
            { $limit: 1 },
            { $skip: 0 },
        ],
        lastUpdated: [
            {
                $match: { is_active: true }
            },
            { $sort: { updated_At: -1 } },
            { $limit: 1 },
            { $skip: 0 },
        ],
    }
}]
module.exports = pipeline