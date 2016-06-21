class HeroController {
  constructor(HeroService) { // eslint-disable-line
    'ngInject';
    this.name = 'Superman';
    this.HeroService = HeroService;
  }

  /** return a Hello message
   *
   * @param {string} name Name which the message is adressed
   * @returns {string} the Hello message with name added
     */
  sayHello(name) {
    return `${this.name} say "Hello ${name}"`;
  }

  /** Return a Hero List
   *
   * @returns {*} hero list
     */
  getList() {
    return this.HeroService.getList();
  }
}

export default HeroController;
