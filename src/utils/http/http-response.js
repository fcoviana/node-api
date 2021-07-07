module.exports = class HttpResponse {
  static badRequest(message) {
    return {
      error: 'BadRequest',
      message,
    };
  }

  static notFound(message) {
    return {
      error: 'NotFound',
      message,
    };
  }

  static serverError(message) {
    return {
      error: 'ServerError',
      message,
    };
  }

  static unauthorizedError(message) {
    return {
      error: 'UnauthorizedError',
      message,
    };
  }

  static ok(data) {
    return {
      data,
    };
  }
};
