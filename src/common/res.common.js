function success(code, message, data, res, extra) {
    return res.status(code).json({ code: code, message: message, data: data ? data : {}, ...extra })
}
function error(code, msg, res, extra) {
    return res.status(code).json({
        error: {
            msg,
            code: code,
            extra
        }
    })
}
module.exports = {
    success,
    error
}