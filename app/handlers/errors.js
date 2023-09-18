const errors = {
  400: {
    name: "BAD REQUEST",
    code: 400,
  },
  401: {
    name: "UNAUTHORIZED",
    code: 401,
  },
  404: {
    name: "NOT FOUND",
    code: 404,
  },
  409: {
    name: "CONFLICT",
    code: 409,
  },
  500: {
    name: "SERVER ERROR",
    code: 500,
  },
};

module.exports = {
  errors,
};
