'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hashids = use('Hashids')

class Region extends Model {
  static get computed () {
    return ['hashids']
  }
  getHashids({ id }) {
    return Hashids.encode(id)
  }

  country() {
    return this.belongsTo('App/Models/Country')
  }

  cities() {
    return this.hasMany('App/Models/City')
  }
}

module.exports = Region
