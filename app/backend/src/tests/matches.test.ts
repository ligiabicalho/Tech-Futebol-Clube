import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { Response } from 'superagent';
import { allMatches, MatchesRes} from './mocks/matchesMock';
import { MatchRes } from '../interfaces/IMatch';
// import { IMatch, MatchRes } from '../interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
      sinon.restore();
    })
  
 describe('Verifica método GET no endpoint /matches', () => {    
    it('retorna status 200 e a lista completa de partidas', async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(MatchesRes as unknown as Match[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');
    
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(MatchesRes);

    });
  });
});