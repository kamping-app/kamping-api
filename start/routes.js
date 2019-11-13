'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register')
  .validator('AuthRegister')
Route.post('/authenticate', 'AuthController.authenticate')

Route.get('/app',  'AppController.index').middleware(['auth'])

Route.resource('campings', 'CampingController').apiOnly().middleware(['auth'])
Route.resource('cities', 'CityController').apiOnly().middleware(['auth'])
Route.resource('states', 'StateController')
  .apiOnly()
  .validator(new Map([
    [['states.store'], ['StateStore']]
  ]))
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']]
  ]))

Route.resource('countries', 'CountryController')
  .apiOnly()
  .validator(new Map([
    [['countries.store'], ['CountryStore']]
  ]))
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']]
  ]))