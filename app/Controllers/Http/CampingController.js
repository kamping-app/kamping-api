'use strict'

const Camping = use('App/Models/Camping')
const Hashids = use('Hashids')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with campings
 */
class CampingController {
  /**
   * Show a list of all campings.
   * GET campings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const campings = await Camping.all()

    return campings
  }

  /**
   * Create/save a new camping.
   * POST campings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const data = request.only(['name', 'city_id', 'region_id', 'country_id', 'lat', 'long'])

    const camping = await Camping.create({ user_id: auth.user.id, ...data})

    return response.created(camping)
  }

  /**
   * Display a single camping.
   * GET campings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const id = Hashids.decode(params.id)
    const camping = await Camping.query()
      .where('id', '=', id)
      .with('city')
      .with('region')
      .with('country')
      .fetch()

    return camping
  }

  /**
   * Update camping details.
   * PUT or PATCH campings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a camping with id.
   * DELETE campings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const id = Hashids.decode(params.id)

    const camping = await Camping.findOrFail(id[0])

    if(camping.user_id != auth.user.id) return response.status(401).json()

    await camping.delete();
  }
}

module.exports = CampingController
