const validate = (schema) => {
    return (req, res, next) => {
        try {
            let { body } = req

            const result = schema.parse(body)

            next()
        } catch (err) {
            next(err)
        }
    }
}

export {
    validate
}