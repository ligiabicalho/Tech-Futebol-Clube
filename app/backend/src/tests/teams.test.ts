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
  afterEach(() => {
      sinon.restore();
    })
  describe('Verifica método GET no endpoint /teams', () => {    
    it('retorna status 200 e a lista completa de teams', async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(allTeams as Team[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');
    
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allTeams);

    });
  });
  describe('Verifica método GET no endpoint /teams:id', () => { 
    it('retorna status 200 e dados de um time específico', async () => {
      sinon
        .stub(Team, "findByPk")
        .resolves(allTeams[0] as Team);
    
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/:1');
    
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allTeams[0]);    
    });

    it('retorna status 404 quando id não corresponde a time cadastrado', async () => {
      sinon
        .stub(Team, "findByPk")
        .resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/:99');
      const messageNotFound = { message: 'Team does not exist in database!'};
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal(messageNotFound);    
    });
  });
});

