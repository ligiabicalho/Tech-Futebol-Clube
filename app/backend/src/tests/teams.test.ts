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

describe('Verifica método GET em /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll") // getAll na Sequelize é findAll
      .resolves(allTeams as Team[]); // a própria Model serve como tipo
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })
 
  it('retorna a lista completa de teams', async () => {
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
   
    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams);

  });
});
