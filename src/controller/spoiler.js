/* eslint-disable no-undef */
const Spoiler = require('../model/spoiler');

exports.buscarUm = (request, response, next) => {
  const { id } = request.params;

  Spoiler.findById(id).then((spoiler) => {
    if (spoiler) {
      response.send(spoiler);
    } else {
      response.status(Status.NOT_FOUND).send();
    }
  }).catch((error) => next(error));
};

exports.buscarTodos = (request, response, next) => {
  let limite = parseInt(request.query.limite || 0, 10);
  let pagina = parseInt(request.query.pagina || 0, 10);

  if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
    response.status(Status.BAD_REQUEST).send();
  }

  const ITENS_POR_PAGINA = 10;

  limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
  pagina = pagina <= 0 ? 0 : pagina * limite;

  Spoiler.findAll({ limit: limite, offset: pagina }).then((spoilers) => {
    if (spoilers && spoilers.length) {
      response.send(spoilers);
    } else {
      response.status(Status.NOT_FOUND).send();
    }
  }).catch((error) => next(error));
};

exports.criar = (request, response, next) => {
  const { titulo } = request.body;
  const { espoliador } = request.body;
  const { descricao } = request.body;

  Spoiler.create({
    titulo,
    espoliador,
    descricao,
  }).then(() => {
    response.status(Status.CREATED).send();
  }).catch((error) => next(error));
};

exports.atualizar = (request, response, next) => {
  const { id } = request.params;

  const { titulo } = request.body;
  const { espoliador } = request.body;
  const { descricao } = request.body;

  Spoiler.findById(id).then((spoiler) => {
    if (spoiler) {
      Spoiler.update({
        titulo,
        espoliador,
        descricao,
      }, { where: { id } }).then(() => {
        response.send();
      }).catch((error) => next(error));
    } else {
      response.status(Status.NOT_FOUND).send();
    }
  }).catch((error) => next(error));
};

exports.excluir = (request, response, next) => {
  const { id } = request.params;

  Spoiler.findById(id).then((spoiler) => {
    if (spoiler) {
      Spoiler.destroy({
        where: { id },
      }).then(() => {
        response.send();
      }).catch((error) => next(error));
    } else {
      response.status(Status.NOT_FOUND).send();
    }
  }).catch((error) => next(error));
};
