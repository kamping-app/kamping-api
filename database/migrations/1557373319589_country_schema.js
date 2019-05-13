'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountrySchema extends Schema {
  up () {
    this.create('countries', (table) => {
      table.increments()
      table.string('name', 140)
      table.string('slug', 140)
      table.string('code', 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('countries')
  }
}

module.exports = CountrySchema
