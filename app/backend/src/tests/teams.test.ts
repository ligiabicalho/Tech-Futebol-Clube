import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
// import ITeam from '../interfaces/ITeams';
import { allTeams } from './mocks/teamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /teams', () => {
  let chaiHttpResponse: Response;
  describe('Verifica método GET no endpoint /teams', () => {

    beforeEach(async () => {
      sinon
        .stub(Team, "findAll") // getAll na Sequelize é findAll!
        .resolves(allTeams as Team[]); // a própria Model serve como tipo.
    });

    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })
  
    it('retorna status 200 e a lista completa de teams', async () => {
    
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');
    
      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.deep.equal(allTeams);

    });
  });
  describe('Verifica método GET no endpoint /teams:id', () => {

    beforeEach(async () => {
      sinon
        .stub(Team, "findByPk") // getAll na Sequelize é findAll!
        .resolves(allTeams[0] as Team); // a própria Model serve como tipo.
    });

    afterEach(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    })
  
    it('retorna status 200 e dados de um time especifico', async () => {
    
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams:1');
    
      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.deep.equal(allTeams[0]);    
    });

    it('retorna status 404 quando id não corresponde a time cadastrado', async () => {
    
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams:99');
      const messageNotFound = 'Team does not exist';
      expect(chaiHttpResponse.status).to.be.equals(404);
      expect(chaiHttpResponse.body).to.deep.equal({messageNotFound});    
    });
  });
});

