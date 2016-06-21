/* user.service.js unit test */
import HeroService from './hero.service';
import chai from 'chai';

let service;

describe('Hero Service', () => {

  beforeEach(() => {
      service = new HeroService;
  });


  describe('getList function', () => {
    it('Must return a hero list', () => {
      const heroList = service.getList();

      chai.expect(heroList).to.eql([{name: 'batman'}, {name: 'superman'}]);
    });

  });

});

