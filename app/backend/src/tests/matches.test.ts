import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Match from '../database/models/MatchModel';
import { Response } from 'superagent';
import { allMatches, MatchesRes, MatchCreate, 
  MatchCreateSameTeams, MatchCreateTeamsNotExist, 
  MatchUpGoals } from './mocks/matchesMock';
import { userValid, userInvalid } from './mocks/loginMock';
import statusCodes from '../utils/statusCode';
// @ts-ignore
import chaiHttp = require('chai-http');
import { assert } from 'chai';
import Team from '../database/models/TeamModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
      sinon.restore();
    })
  
 describe('GET endpoint /matches', () => {    
    it('Retorna lista completa de partidas, status 200', async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(MatchesRes);

      chaiHttpResponse = await chai.request(app)
        .get('/matches');
    
      expect(chaiHttpResponse).to.have.status(statusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal(MatchesRes);

    });
  });
  describe('GET endpoint /matches query: inProgress', () => {    
    it('Filtra as partidas em progresso, status 200', async () => {
      sinon.stub(Match, "findAll")
        .resolves([MatchesRes[1]]);

      chaiHttpResponse = await chai.request(app)
        .get('/matches')
        .query({inProgress: true});
    
      expect(chaiHttpResponse).to.have.status(statusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal([MatchesRes[1]]);
    }); 
    it('Filtra as partidas finalizadas, status 200', async () => {
      sinon.stub(Match, "findAll")
        .resolves([MatchesRes[0]]);

      chaiHttpResponse = await chai.request(app)
        .get('/matches')
        .query({inProgress: false});
    
      expect(chaiHttpResponse).to.have.status(statusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal([MatchesRes[0]]);
    });
  });
  describe('POST endpoint /matches não autorizada', () => {  
    it('Não é possível acessar rota com token inválido, status 401', async () => {
      sinon
        .stub(Match, "create")
        .resolves(allMatches[1]);

        const responseLoginInvalid = await chai
        .request(app)
        .post('/login')
        .send(userInvalid)
        const { token } = responseLoginInvalid.body // pega token gerado no teste

        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `${token}`)
        .send(MatchCreate)

      expect(chaiHttpResponse).to.have.status(statusCodes.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.deep.equal( { message: 'Token must be a valid token' } );  
    });
    it('Não é possível acessar rota sem token, status 401', async () => {
      sinon
        .stub(Match, "create")
        .resolves(allMatches[1]);

        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', '') // sem token
        .send(MatchCreate)

      expect(chaiHttpResponse).to.have.status(statusCodes.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.deep.equal( { message: 'Token not found' } );  
    });
  });
  describe('POST endpoint /matches autorizado', () => { 
    let responseLogin: Response;
    beforeEach(async () => {
      responseLogin = await chai
        .request(app)
        .post('/login')
        .send(userValid)
    });
    it('Cria com sucesso partida em andamento, status 201', async () => {
      sinon
      .stub(Match, "create")
      .resolves(allMatches[1]);
      
      const { token } = responseLogin.body
      
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `${token}`)
      .send(MatchCreate)

      expect(chaiHttpResponse).to.have.status(statusCodes.CREATED);
      expect(chaiHttpResponse.body).to.deep.equal(allMatches[1]);
    }); 
    it('Não cria partida com times iguais, status 422', async () => {
      sinon
        .stub(Match, "create")
        .resolves();

        const { token } = responseLogin.body
        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `${token}`)
        .send(MatchCreateSameTeams)

      assert(chaiHttpResponse.error);
      expect(chaiHttpResponse).to.have.status(statusCodes.UNPROCESSABLE);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams'});
    });
    it('Não cria partida com times inexistentes no db, status 422', async () => {
      sinon
        .stub(Match, "create")
        .resolves();
      sinon
        .stub(Team, "findByPk")
        .resolves(undefined);

        const { token } = responseLogin.body
        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `${token}`)
        .send(MatchCreateTeamsNotExist)

      assert(chaiHttpResponse.error);
      expect(chaiHttpResponse).to.have.status(statusCodes.NOT_FOUND);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'There is no team with such id!'});
    });
  });
  describe('PATCH endpoint /matches/:id autorizado', () => { 
    let responseLogin: Response;
    beforeEach(async () => {
      responseLogin = await chai
        .request(app)
        .post('/login')
        .send(userValid)
    });
    it('Finaliza partida em andamento com sucesso, status 200', async () => {
      sinon
      .stub(Match, 'update')
      .resolves([1]);
      
      const { token } = responseLogin.body
      
      chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/2/finish')
      .set('Authorization', `${token}`)

      expect(chaiHttpResponse).to.have.status(statusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finish!' });
    }); 
    it('Atualiza placar da partida em andamento com sucesso, status 200', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);

        const { token } = responseLogin.body
        chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set('Authorization', `${token}`)
        .send(MatchUpGoals);

      expect(chaiHttpResponse).to.have.status(statusCodes.OK);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Goal!' });
    });
  });
});