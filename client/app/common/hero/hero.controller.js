class HeroController {
  constructor() { // eslint-disable-line
    this.name = 'Superman';
  }

  /** return a Hello message
   *
   * @param {string} name Name which the message is adressed
   * @returns {string} the Hello message with name added
     */
  sayHello(name) {
    return `${this.name} say "Hello ${name}"`;
  }
}

export default HeroController;
