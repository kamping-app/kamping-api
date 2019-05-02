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
}

module.exports = Camping
