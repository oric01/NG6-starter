import angular from 'angular';
import uiRouter from 'angular-ui-router';
import heroComponent from './hero.component';
import HeroService from './hero.service';

const heroModule = angular.module('hero', [
  uiRouter,
])

  .component('hero', heroComponent)
  .service('HeroService', HeroService);

export default heroModule;
