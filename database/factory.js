'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
    ...data
  }
})

Factory.blueprint('App/Models/Country', (faker, i, data = {}) => {
  return {
    name: faker.country({ full: true }),
    code: faker.country(),
    ...data
  }
})

Factory.blueprint('App/Models/State', (faker, i, data = {}) => {
  return {
    name: faker.state(),
    ...data
  }
})