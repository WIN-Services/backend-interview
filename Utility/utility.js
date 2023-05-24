const errorCodes = [400, 404];
const successCodes = [200, 201];

export function buildResponse(data, request, response) {
  if (errorCodes.includes(data.status)) {
    return response.status(data.status).json({
      error: data.error,
    });
  } else if (successCodes.includes(data.status)) {
    return response.status(data.status).json({
      message: data.message,
    });
  } else {
    return response.status(500).json({
      message: "Something went wrong",
    });
  }
}
