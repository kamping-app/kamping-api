'use strict'

const { test, trait } = use('Test/Suite')('Region Store')

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");


test('it should create a Region with valid data', async ({ assert, client }) => {

  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").create();
  const region = await Factory.model("App/Models/Region").make({ country_id: country.id });

  const response = await client
    .post("/regions")
    .loginVia(user, "jwt")
    .send({ ...region.toJSON() })
    .end();

  response.assertStatus(201);
  assert.equal(response.body.name, region.name);
})

test('it should NOT create a Region with invalid data', async ({ assert, client }) => {

  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").create();
  const region = {
    name: null,
    country_id: country.id
  }

  const response = await client
    .post("/regions")
    .loginVia(user, "jwt")
    .send({ ...region })
    .end();

  response.assertStatus(400);
})