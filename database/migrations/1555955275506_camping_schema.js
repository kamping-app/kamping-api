'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampingSchema extends Schema {
  up () {
    this.create('campings', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 240).notNullable()
      table.string('city', 140).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('campings')
  }
}

module.exports = CampingSchema
