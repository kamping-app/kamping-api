'use strict'

class CountryStore {
  get rules() {
    return {
      name: "required",
      code: "required",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CountryStore
