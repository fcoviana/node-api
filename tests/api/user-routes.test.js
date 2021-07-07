const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/config/knex');
const { UserFactory } = require('../factories');

let server, agent;

const makeSut = async () => {
  const user = await UserFactory.build().data();

  return {
    user,
  };
};

describe('User Routes', () => {
  beforeEach((done) => {
    server = app.listen(4000, (err) => {
      if (err) return done(err);

      agent = request.agent(server);
      done();
    });
  });

  afterEach((done) => {
    return server && server.close(done);
  });

  test('should create and return one item', async () => {
    const { user } = await makeSut();
    const response = await agent.post('/api/v1/users').send(user);

    expect(response).not.toBeUndefined();
    expect(response.body.id).not.toBeNull();
    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    expect(response.body.password).not.toBeNull();
    expect(response.statusCode).toBe(201);
  });

  test('should update and return one item', async () => {
    const { user } = await makeSut();
    const sut = await UserFactory.build().create(knex);

    const data = {
      id: sut.id,
      name: user.name,
      password: user.password,
      email: user.email,
    };

    const response = await agent.put('/api/v1/users').send(data);

    expect(response).not.toBeUndefined();
    expect(response.body.id).not.toBeNull();
    expect(response.body.name).toBe(data.name);
    expect(response.body.email).toBe(data.email);
    expect(response.body.password).toBe(data.password);
    expect(response.statusCode).toBe(200);
  });

  it('should return all paged items', async () => {
    const response = await agent.get('/api/v1/users').send();

    expect(response).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it('should return one item', async () => {
    const sut = await UserFactory.build().create(knex);

    const response = await agent.get(`/api/v1/users/${sut.id}`).send();

    expect(response).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  it('should delete one item', async () => {
    const { id, name, email, password } = await UserFactory.build().create(knex);

    const response = await agent.delete(`/api/v1/users/${id}`).send({ id, name, email, password });

    expect(response).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });
});
