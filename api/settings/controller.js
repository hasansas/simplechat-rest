/**
 * Settings Controller
 */

'use strict'

import SequalizePagintaion from '../../libs/sequalize_pagintaion'
import roleMiddleware from '../../middleware/role'

class SettingsController {
  constructor ({ req, res }) {
    this.request = req
    this.query = req.query
    this.res = res
    this.settingsModel = DB.settings
  }

  /**
   * Display a listing of Settings.
   *
   * @return {Object} HTTP Response
   */
  async index () {
    try {
      // Params
      const order = this.query.order ?? 'name'
      const sort = this.query.sort ?? 'ASC'

      // filter
      const Op = DB.Sequelize.Op

      let filter = {}
      if (this.query.search) {
        filter = {
          ...{ name: { [Op.iLike]: `%${this.query.search}%` } }
        }
      }

      // Get data
      const sequalizePagintaion = SequalizePagintaion(this.request)
      return this.settingsModel
        .findAndCountAll({
          offset: sequalizePagintaion.offset(),
          limit: sequalizePagintaion.limit,
          order: [
            [order, sort]
          ],
          where: {
            ...{
              deletedAt: null,
              ...filter
            }
          }
        })
        .then((data) => {
          const _data = {
            total: data.count,
            rows: data.rows
          }
          const resData = sequalizePagintaion.paginate(_data)

          return SEND_RESPONSE.success({ res: this.res, statusCode: HTTP_RESPONSE.status.ok, data: resData })
        })
        .catch((error) => {
          return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error })
        })
    } catch (error) {
      return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error })
    }
  }

  /**
   * Display the specified contact.
   *
   * @param {uuid} id
   * @return {Object} HTTP Response
   */
  async show () {
    try {
      // filter
      let filter = [{ id: this.request.params.id }]

      if (this.query.slug) {
        const name = this.request.params.id.replaceAll('-', ' ')
        filter = [DB.Sequelize.where(
          DB.Sequelize.fn('lower', DB.Sequelize.col('name')),
          DB.Sequelize.fn('lower', name))
        ]
      }

      // client scope
      const userAuth = this.request.userAuth
      let attributes = {}
      if (userAuth === null || userAuth.role === 'client') {
        attributes = {
          ...{ attributes: { exclude: ['publish'] } }
        }
      }

      return this.settingsModel
        .findOne({
          where: [
            ...filter,
            ...[{ deleted_at: null }]
          ],
          ...attributes
        })
        .then((data) => {
          return SEND_RESPONSE.success({ res: this.res, statusCode: HTTP_RESPONSE.status.ok, data })
        })
        .catch((error) => {
          return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error })
        })
    } catch (error) {
      return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error })
    }
  }

  /**
   * Create new Setting
   *
   * @param {string} name
   * @param {string} value
   * @return {Object} HTTP Response
   */
  async create () {
    try {
      // Role authorization
      roleMiddleware({ req: this.request, res: this.res, allowedRoles: ['superadmin', 'admin'] })

      // success response
      return SEND_RESPONSE.success({ res: this.res, statusCode: HTTP_RESPONSE.status.notImplement })
    } catch (error) {
      return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error: error })
    }
  }

  /**
   * Update the specified Setting.
   *
   * @param {string} value
   * @param {number} position
   * @return {Object} HTTP Response
   */
  async update () {
    try {
      // Role authorization
      roleMiddleware({ req: this.request, res: this.res, allowedRoles: ['superadmin', 'admin'] })

      // success response
      return SEND_RESPONSE.success({ res: this.res, statusCode: HTTP_RESPONSE.status.notImplement })
    } catch (error) {
      return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error: error })
    }
  }

  /**
   * Remove the specified Setting.
   *
   * @param {uuid} id
   * @return {Object} HTTP Response
   */
  async delete () {
    try {
      // Role authorization
      roleMiddleware({ req: this.request, res: this.res, allowedRoles: ['superadmin', 'admin'] })

      // success response
      return SEND_RESPONSE.success({ res: this.res, statusCode: HTTP_RESPONSE.status.notImplement })
    } catch (error) {
      return SEND_RESPONSE.error({ res: this.res, statusCode: HTTP_RESPONSE.status.internalServerError, error: error })
    }
  }
}
export default ({ req, res }) => new SettingsController({ req, res })
