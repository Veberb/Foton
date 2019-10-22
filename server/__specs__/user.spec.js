const MongoMemory = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const server = require('../src/');

const REGISTER = `
  mutation addUser($newUser: SignIn) {
    addUser(newUser: $newUser) {
      id
      login
    }
  }
`;

const SIGN_IN = `
  mutation signIn($authentication: SignIn) {
    signIn(authentication: $authentication)
  }
`;

let mongod;
describe('User Test', () => {
  before(async () => {
    mongod = new MongoMemory();
    const conn = await mongoose.connect(await mongod.getConnectionString(), {
      useNewUrlParser: true,
    });
    return conn;
  });

  it('Create User', done => {
    request(server)
      .post('/graphql')
      .send({
        query: REGISTER,
        variables: {
          newUser: { login: 'veber', password: '123456' },
        },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.addUser).to.have.property('id');
        expect(res.body.data.addUser).to.have.property('login');
        done();
      });
  });
  it('Duplicate user login', done => {
    request(server)
      .post('/graphql')
      .send({
        query: REGISTER,
        variables: {
          newUser: { login: 'veber', password: '123456' },
        },
      })
      .end((err, res) => {
        console.log();
        expect(res.body.errors[0].message).to.contains('duplicate key');
        done();
      });
  });
  it('Auth user', done => {
    request(server)
      .post('/graphql')
      .send({
        query: SIGN_IN,
        variables: {
          authentication: { login: 'veber', password: '123456' },
        },
      })
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.data).to.have.property('signIn');
        done();
      });
  });
  after(() => {
    mongod.stop();
  });
});
