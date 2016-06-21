class HeroService {

  constructor() { // eslint-disable-line
    this.heroes = [{ name: 'batman' }, { name: 'superman' }];
  }

  /** Return a hero list
   *
   * @returns {*} hero list
   */
  getList() {
    return this.heroes;
  }
}

export default HeroService;
