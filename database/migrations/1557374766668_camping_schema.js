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
      table
        .integer('country_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .default(2)
      table
        .integer('region_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('regions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('city_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 240).notNullable()
      table.text('address').nullable()
      table.decimal('lat', 10, 8).default('-00.0000000000000');
      table.decimal('lng', 11, 8).default('-00.0000000000000');
      table.boolean('claimed').default(0);
      table.timestamps()
    })
  }

  down () {
    this.drop('campings')
  }
}

module.exports = CampingSchema
