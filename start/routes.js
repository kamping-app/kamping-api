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

Route.resource('campings', 'CampingController').apiOnly()
  .validator(new Map([
    [['campings.store'], ['CampingStore']]
  ]))
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']]
  ]))

Route.resource('cities', 'CityController').apiOnly().middleware(['auth'])
Route.resource('regions', 'RegionController')
  .apiOnly()
  .validator(new Map([
    [['regions.store'], ['RegionStore']]
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