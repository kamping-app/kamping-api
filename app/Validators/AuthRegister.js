"use strict";

class AuthRegister {
  get rules() {
    return {
      email: "required|email|unique:users",
      username: "required|unique:users",
      password: "required"
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = AuthRegister;
