const { HttpResponse } = require('../utils');

module.exports = (schema) => async (request, response, next) => {
  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    return response.status(400).json(HttpResponse.badRequest(err.errors[0]));
  }
};
