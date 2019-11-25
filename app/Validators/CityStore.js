'use strict'

class CityStore {
  get rules () {
    return {
      name: "required",
      country_id: "required",
      region_id: "required",
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CityStore
