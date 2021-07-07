const { HashUtil, ImageUtil } = require('../utils');

module.exports = class UserService {
  constructor({ userRepository, roleRepository }) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  async findById(id) {
    if (!id) throw new Error('Id não informado');
    const user = await this.userRepository.findWhere({ id });
    if (!user) return false;
    const roles = await this.roleRepository.findRolesUser(id);

    return { ...user, roles: [...roles] };
  }

  async fetchAll(paginate = {}) {
    return await this.userRepository.fetchAll(paginate);
  }

  async create(user) {
    if (!user) throw new Error('Usuário não informado');
    const userExist = await this.userRepository.findWhere({ email: user.email });

    if (userExist) return { message: 'E-mail já cadatrado' };
    if (user.avatar) {
      user.avatar = await ImageUtil.saveLocal({ user, url: process.env.URL });
    }

    const passwordHash = await HashUtil.encryptPassword(user.password);
    const createdUser = await this.userRepository.create({
      ...user,
      password: passwordHash,
    });

    return createdUser;
  }

  async update(user) {
    if (!user) throw new Error('Usuário não informado');
    return await this.userRepository.update(user);
  }

  async delete(user) {
    if (!user) throw new Error('Usuário não informado');
    return await this.userRepository.delete(user);
  }
};
