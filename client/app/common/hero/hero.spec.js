import HeroModule from './hero';
import HeroController from './hero.controller';
import HeroComponent from './hero.component';
import HeroTemplate from './hero.html';


import chai from 'chai';

describe('Hero', () => {
  let makeController;

  beforeEach(window.module(HeroModule.name));
  beforeEach(inject(() => {
    makeController = () => new HeroController();
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      chai.expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      chai.expect(HeroTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = HeroComponent;

    it('includes the intended template', () => {
      chai.expect(component.template).to.equal(HeroTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      chai.expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      chai.expect(component.controller).to.equal(HeroController);
    });
  });
});
