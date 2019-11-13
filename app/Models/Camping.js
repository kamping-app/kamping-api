'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hashids = use('Hashids')

class Camping extends Model {
  static get computed () {
    return ['hashids']
  }
  getHashids({ id }) {
    return Hashids.encode(id)
  }

  // country() {
  //   return this.belongsTo('App/Models/Country')
  // }

  // state() {
  //   return this.belongsTo('App/Models/State')
  // }

  city() {
    return this.belongsTo('App/Models/City')
  }
}

module.exports = Camping
