'use strict'

const Region = use('App/Models/Region')
const Hashids = use('Hashids')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with region
 */
class RegionController {
  /**
   * Show a list of all region.
   * GET region
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new region.
   * GET region/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new region.
   * POST region
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'country_id'])
    const region = await Region.create({...data})
    return response.created(region)
  }

  /**
   * Display a single region.
   * GET region/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const id = this.decodeHashid(params, response)
    return id
    const region = await Region.query()
      .where('id', '=', id)
      .with('country')
      .with('cities')
      .fetch()

    if(region.rows.length === 0) {
      return response
              .status(404)
              .send({ message: {error: 'No region found' } })
    }
    return region
  }

  /**
   * Render a form to update an existing region.
   * GET region/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update region details.
   * PUT or PATCH region/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a region with id.
   * DELETE region/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async decodeHashid(params) {
    const id = await Hashids.decode(params.id)
    if(id.length <= 0) return 0
    return id
  }
}

module.exports = RegionController
