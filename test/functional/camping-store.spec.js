'use strict'

const { test, trait } = use('Test/Suite')('Camping Store')

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

test("it should create a Camping with valid data", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").create();
  const region = await Factory.model("App/Models/Region").create({ country_id: country.id });
  const city = await Factory.model("App/Models/City").create({ country_id: country.id, region_id: region.id });
  const camping = await Factory.model("App/Models/Camping").make({ country_id: country.id, region_id: region.id, city_id: city.id });

  const response = await client
    .post("/campings")
    .loginVia(user, "jwt")
    .send({ ...camping.toJSON() })
    .end();

  response.assertStatus(201);
  assert.equal(response.body.name, camping.name);
});

test('it should NOT create a Region with invalid data', async ({ assert, client }) => {

  const user = await Factory.model("App/Models/User").create();
  const country = await Factory.model("App/Models/Country").create();
  const region = await Factory.model("App/Models/Region").create({ country_id: country.id });
  const city = await Factory.model("App/Models/City").create({ country_id: country.id, region_id: region.id });
  const camping = {
    name: null,
    country_id: country.id,
    region_id: region.id,
    city_id: city.id
  }

  const response = await client
    .post("/campings")
    .loginVia(user, "jwt")
    .send({ ...camping })
    .end();

  response.assertStatus(400);
})