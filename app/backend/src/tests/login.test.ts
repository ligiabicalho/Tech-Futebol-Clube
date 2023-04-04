import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import { Response } from 'superagent';
import { token, user, userValid } from './mocks/loginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
      sinon.restore();
    })
  
  describe('Acessa com sucesso método POST no endpoint /login', () => {    
    it('retorna status 200 e o token', async () => {
      sinon
        .stub(User, "findOne").resolves(user);
      sinon
        .stub(bcrypt, 'compareSync').resolves(true);
      sinon
        .stub(jwt, 'sign').resolves(token);

      chaiHttpResponse = await chai
        .request(app).post('/login').send(userValid);
    
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({token});
    });
  });
  describe('Acesso negado método POST no endpoint /login', () => {
    const messageError = { message: 'All fields must be filled' }
    it('retorna status 400 quando email não é informado', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/login').send(userValid.password);
    
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal(messageError);    
    });

    it('retorna status 400 quando a senha não é informada', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/login').send(userValid.email);
      const messageNotFound = { error: 'Team does not exist in database!'};
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal(messageError);  
    });  
  });
});
