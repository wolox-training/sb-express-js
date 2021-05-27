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
        expect(lastName).toBe(userCopied.last_name);
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
        expect(response.body.message).toBe('The password only allows alphanumeric characters');
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
      .expect(400)
      .then(response => {
        expect(response.body.message).toBe('name is required');
        expect(response.body.internal_code).toBe('validation_error');
        done();
      });
  });
});

describe('POST /users/sessions', () => {
  it('Sign in successful', done => {
    const { email, password } = user;
    request(app)
      .post('/users/sessions')
      .send({ email, password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body: { token } }) => {
        expect(token).toBeTruthy();
        done();
      });
  });

  it('Sign in failed - Wrong password', done => {
    const { email } = user;
    request(app)
      .post('/users/sessions')
      .send({ email, password: shortPassword })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body: { message, internal_code } }) => {
        expect(message).toBe('Email or password is wrong');
        expect(internal_code).toBe('validation_error');
        done();
      });
  });

  it('Sign in failed - Non format email', done => {
    const { password } = user;
    request(app)
      .post('/users/sessions')
      .send({ email: nonFormatEmail, password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body: { message, internal_code } }) => {
        expect(message).toBe('Email entered does not comply with the Wolox emails format');
        expect(internal_code).toBe('validation_error');
        done();
      });
  });

  it('Sign in failed - Non extistent email', done => {
    const { password } = user;
    request(app)
      .post('/users/sessions')
      .send({ email: anotherEmail, password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body: { message, internal_code } }) => {
        expect(message).toBe('Email or password is wrong');
        expect(internal_code).toBe('validation_error');
        done();
      });
  });

  it('Sign in failed - Missing data', done => {
    const { email } = user;
    request(app)
      .post('/users/sessions')
      .send({ email })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body: { message, internal_code } }) => {
        expect(message).toBe('password is required');
        expect(internal_code).toBe('validation_error');
        done();
      });
  });
});
