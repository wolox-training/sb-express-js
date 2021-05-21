const request = require('supertest');

const app = require('../app');
const {
  user,
  anotherEmail,
  nonFormatEmail,
  externalMail,
  shortPassword,
  nonAlphaNumericPassword
} = require('./data/users');

const copyUser = () => ({ ...user });

describe('POST /users', () => {
  let userCopied = '';

  beforeEach(() => {
    userCopied = copyUser();
  });

  it('Sign up successful - New user', done => {
    request(app)
      .post('/users')
      .send(userCopied)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const { id, name, last_name: lastName, email } = body;
        expect(id).toBe(1);
        expect(name).toBe(userCopied.name);
        expect(lastName).toBe(userCopied.lastName);
        expect(email).toBe(userCopied.email);
        done();
      });
  });

  it('Sign up failed - Existing user', done => {
    request(app)
      .post('/users')
      .send(userCopied)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(503)
      .then(response => {
        expect(response.body.message).toBe(`User with email '${userCopied.email}' already exists`);
        expect(response.body.internal_code).toBe('database_error');
        done();
      });
  });

  it('Sign up failed - Password with non alphanumeric characters', done => {
    userCopied.password = nonAlphaNumericPassword;
    request(app)
      .post('/users')
      .send(userCopied)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe('The password must have a minimum of 8 alphanumeric characters');
        expect(response.body.internal_code).toBe('validation_error');
        done();
      });
  });

  it('Sign up failed - Password with non alphanumeric characters', done => {
    userCopied.password = shortPassword;
    request(app)
      .post('/users')
      .send(userCopied)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe('The password must have a minimum of 8 alphanumeric characters');
        expect(response.body.internal_code).toBe('validation_error');
        done();
      });
  });

  it('Sign up failed - External email from organization', done => {
    userCopied.email = externalMail;
    request(app)
      .post('/users')
      .send(userCopied)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe('Email entered does not comply with the Wolox emails format');
        expect(response.body.internal_code).toBe('validation_error');
        done();
      });
  });

  it('Sign up failed - Malformed email', done => {
    userCopied.email = nonFormatEmail;
    request(app)
      .post('/users')
      .send(userCopied)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe('Email entered does not comply with the Wolox emails format');
        expect(response.body.internal_code).toBe('validation_error');
        done();
      });
  });

  it('Sign up failed - Missing data', done => {
    userCopied.email = anotherEmail;
    delete userCopied.name;
    request(app)
      .post('/users')
      .send(userCopied)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(503)
      .then(response => {
        expect(response.body.message).toBe('Cannot create user');
        expect(response.body.internal_code).toBe('database_error');
        done();
      });
  });
});
