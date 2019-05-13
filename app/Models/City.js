'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hashids = use('Hashids')

class City extends Model {

  static get computed () {
    return ['hashids']
  }
  getHashids({ id }) {
    return Hashids.encode(id)
  }

  campings() {
    return this.hasMany('App/Models/Camping')
  }
}

module.exports = City
