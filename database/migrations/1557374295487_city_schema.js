'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.create('cities', (table) => {
      table.increments()
      table
        .integer('country_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('state_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('states')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 140)
      table.string('slug', 140)
      table.timestamps()
    })
  }

  down () {
    this.drop('cities')
  }
}

module.exports = CitySchema
