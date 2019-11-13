"use strict";

const { test, trait } = use("Test/Suite")("Auth Register");

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

test("it should create a user with valid data", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").make();

  const response = await client
    .post("/register")
    .send({ ...user.toJSON() })
    .end();

  response.assertStatus(200);

  assert.equal(response.body.email, user.email);
});

test("can't create user with invalid data", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").make();

  const response = await client
    .post("/register")
    .send({ name: user.name, email: "", password: user.password })
    .end();

    console.log(response)

  response.assertStatus(400);
});
