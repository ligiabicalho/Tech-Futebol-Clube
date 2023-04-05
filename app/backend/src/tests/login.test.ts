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
import statusCodes from '../utils/statusCode';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
      sinon.restore();
    })
  
  describe('POST no endpoint /login com sucesso', () => {    
    it('retorna status 200 e o token', async () => {
      sinon
        .stub(User, "findOne").resolves(user);
      sinon
        .stub(bcrypt, 'compareSync').resolves(true);
      sinon
        .stub(jwt, 'sign').resolves(token);

      chaiHttpResponse = await chai
        .request(app).post('/login').send(userValid);
    
      expect(chaiHttpResponse.status).to.be.equal(statusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal({token});
    });
  });
  describe('POST no endpoint /login sem sucesso', () => {
    const messageError = { message: 'All fields must be filled' }

    it('Quando email não é informado, retorna status 400', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/login').send(userValid.password);
    
      expect(chaiHttpResponse.status).to.be.equal(statusCodes.BAD_REQUEST);
      expect(chaiHttpResponse.body).to.deep.equal(messageError);    
    });

    it('Quando a senha não é informada, retorna status 400', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/login').send(userValid.email);
      const messageNotFound = { error: 'Team does not exist in database!'};
      expect(chaiHttpResponse.status).to.be.equal(statusCodes.BAD_REQUEST);
      expect(chaiHttpResponse.body).to.deep.equal(messageError);  
    });
  });
  describe('GET no endpoint /login/role', () => {
    it('Com token válido, retorna `role` do usuário, status 200', async () => {
      const responseLogin = await chai.request(app)
        .post('/login')
        .send(userValid);
      const { token } = responseLogin.body;

      chaiHttpResponse = await chai.request(app)
        .get('/login/role')
        .send(userValid)
        .set('Authorization', `${token}`);

      expect(chaiHttpResponse.status).to.be.equal(statusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal({ role: user.role });    
    });

    it('Sem token, acesso não autorizado na rota, status 401', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/login/role')
        .send(userValid)
        .set('Authorization', '');
    
      expect(chaiHttpResponse.status).to.be.equal(statusCodes.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token not found' }); 
    });  
  });
});
