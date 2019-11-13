'use strict'

class StateStore {
  get rules() {
    return {
      name: "required",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = StateStore
