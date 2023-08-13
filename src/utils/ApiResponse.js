const apiResponse = (message, data=[], status="success") => {    
    if(status==="f"){
      status="error"
    }
    return {
      status, message, data
    }
  }

module.exports = apiResponse;