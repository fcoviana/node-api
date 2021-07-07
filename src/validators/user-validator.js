const yup = require('yup');
const isUUID = require('validator/lib/isUUID');
require('./yup.locale.pt-br');

module.exports = yup.object().shape({
  id: yup.string().test({
    name: 'id',
    message: '${path} deve ser um uuid',
    test: (value) => (value ? isUUID(value) : true),
  }),
  name: yup
    .string()
    .required('Informe o nome do usuário')
    .test({
      message: 'o nome deve ter no minimo 3 digitos',
      test: (value) => (value ? String(value).length >= 3 : false),
    }),
  email: yup.string().email('Informe um e-mail válido').required('Informe o e-mail'),
  password: yup.string().required('Informe a senha').min(6),
});
