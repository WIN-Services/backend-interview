const error = (code) => {
    return (message) => {
        return {error: new Error(message).toString(), statusCode: code}
    }
}

const ForbiddenError = error(403)

const NotFoundError = error(404)

const ApiError = error(500)

module.exports = {ForbiddenError, NotFoundError, ApiError}