import template from './navbar.html';
import controller from './navbar.controller';
import './navbar.styl';

const navbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm',
};

export default navbarComponent;
