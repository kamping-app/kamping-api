"use strict";

const { test, trait } = use("Test/Suite")("Country Store");

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

test("it should create a Country with valid data", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").make();

  const response = await client
    .post("/countries")
    .loginVia(user, "jwt")
    .send({ ...country.toJSON() })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.name, country.name);
});

test("it should not create a Country with invalid data", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const country = {
    name: 'Brasil',
    code: null
  };

  const response = await client
    .post("/countries")
    .loginVia(user, "jwt")
    .send(country)
    .end();

  response.assertStatus(400);
});
