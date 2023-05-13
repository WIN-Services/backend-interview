const logger = (level) => {
    return (message) => {
        console.log(`${level} log --> ${message}`)
    }
}

ERROR_LOGGER = logger('Error')
INFO_LOGGER = logger('Info')
WARN_LOGGER = logger('Warn')

module.exports = {ERROR_LOGGER, INFO_LOGGER, WARN_LOGGER}