'use strict'

const { test, trait } = use('Test/Suite')('State Store')

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");


test('it should create a State with valid data', async ({ assert, client }) => {

  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").create();
  const state = await Factory.model("App/Models/State").make();

  const response = await client
    .post("/states")
    .loginVia(user, "jwt")
    .send({ ...state.toJSON(), country_id: country.id })
    .end();

  response.assertStatus(201);
  assert.equal(response.body.name, state.name);

})