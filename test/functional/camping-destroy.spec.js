'use strict'

const { test, trait } = use('Test/Suite')('Camping Destroy')

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

test('it should delete some Camping with righ credentials', async ({   assert, client }) => {

  const user = await Factory.model('App/Models/User').create()

  const country = await Factory.model("App/Models/Country").create();
  const region = await Factory.model("App/Models/Region").create({ country_id: country.id });
  const city = await Factory.model("App/Models/City").create({ country_id: country.id, region_id: region.id });
  const camping = await Factory.model("App/Models/Camping").create({
    user_id: user.id,
    country_id: country.id,
    region_id: region.id,
    city_id: city.id
  });

  const response = await client
    .delete(`/campings/${camping.toJSON().hashids}`)
    .loginVia(user, "jwt")
    .end();
  response.assertStatus(204);
})

test('it should NOT delete some Camping with wrong credentials', async ({   assert, client }) => {

  const user = await Factory.model('App/Models/User').create()
  const user2 = await Factory.model('App/Models/User').create()

  const country = await Factory.model("App/Models/Country").create();
  const region = await Factory.model("App/Models/Region").create({ country_id: country.id });
  const city = await Factory.model("App/Models/City").create({ country_id: country.id, region_id: region.id });
  const camping = await Factory.model("App/Models/Camping").create({
    user_id: user2.id,
    country_id: country.id,
    region_id: region.id,
    city_id: city.id
  });

  const response = await client
    .delete(`/campings/${camping.toJSON().hashids}`)
    .loginVia(user, "jwt")
    .end();
  response.assertStatus(401);
})
