import template from './about.html';
import controller from './about.controller';
import './about.styl';

const aboutComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm',
};

export default aboutComponent;
