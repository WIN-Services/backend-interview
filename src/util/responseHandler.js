export default function responseHandler(res, statusCode, responseMsg, responseData = null) {
    return res.status(statusCode).send({
        'message' : responseMsg,
        'data'    : responseData
    });
}
