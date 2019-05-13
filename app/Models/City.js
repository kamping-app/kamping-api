'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class City extends Model {

  campings() {
    return this.hasMany('App/Models/Camping')
  }
}

module.exports = City
