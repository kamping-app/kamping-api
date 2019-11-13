"use strict";

const { test, trait } = use("Test/Suite")("User Authenticate");

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

test("it should return JWT when session created", async ({
  assert,
  client
}) => {
  const sessionPayload = {
    email: "vicainelli@gmail.com",
    password: "123456"
  };

  await Factory.model("App/Models/User").create(sessionPayload);

  const response = await client
    .post("/authenticate")
    .send(sessionPayload)
    .end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});
