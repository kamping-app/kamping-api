'use strict'

const { test, trait } = use('Test/Suite')('City Store')

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

test("it should create a City with valid data", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").create();
  const region = await Factory.model("App/Models/Region").create({ country_id: country.id });
  const city = await Factory.model("App/Models/City").make({ country_id: country.id, region_id: region.id });

  const response = await client
    .post("/cities")
    .loginVia(user, "jwt")
    .send({ ...city.toJSON() })
    .end();

  response.assertStatus(201);
  assert.equal(response.body.name, city.name);
});


test('it should NOT create a Region with invalid data', async ({ assert, client }) => {

  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").create();
  const region = await Factory.model("App/Models/Region").create({ country_id: country.id });

  const city = {
    name: null,
    country_id: country.id,
    region_id: region.id
  }

  const response = await client
    .post("/cities")
    .loginVia(user, "jwt")
    .send({ ...city })
    .end();

  response.assertStatus(400);
})