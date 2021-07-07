const { UserFactory } = require('../factories');
const userService = UserFactory();
const { ValidationMiddleware } = require('../middlewares');
const { UserValidator } = require('../validators');
const { HttpResponse } = require('../utils');

module.exports = (routerInstance) => {
  const routes = routerInstance();

  routes.post('', ValidationMiddleware(UserValidator), async (request, response) => {
    try {
      const data = await userService.create(request.body);
      if (data.message) return response.status(400).send(HttpResponse.badRequest(data.message));
      else return response.status(201).send(data);
    } catch (error) {
      return response.status(500).send(HttpResponse.serverError(error.message));
    }
  });

  routes.get('', async (request, response) => {
    try {
      const data = await userService.fetchAll(request.query);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(500).send(HttpResponse.serverError(error.message));
    }
  });

  routes.get('/:id', async (request, response) => {
    try {
      const data = await userService.findById(request.params.id);
      if (data) return response.send(data);
      else return response.status(404).send(HttpResponse.notFound('Usuário não encontrado'));
    } catch (error) {
      return response.status(500).send(HttpResponse.serverError(error.message));
    }
  });

  routes.put('', async (request, response) => {
    try {
      const data = await userService.update(request.body);
      if (data) return response.send(data);
      else return response.status(404).send(HttpResponse.notFound('Usuário não encontrado'));
    } catch (error) {
      return response.status(500).send(HttpResponse.serverError(error.message));
    }
  });

  routes.delete('/:id', async (request, response) => {
    try {
      const data = await userService.delete(request.body);
      if (data) return response.send(data);
      else return response.status(404).send(HttpResponse.notFound('Usuário não encontrado'));
    } catch (error) {
      return response.status(500).send(HttpResponse.serverError(error.message));
    }
  });

  return routes;
};
