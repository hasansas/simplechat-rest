/**
 * Settings Routes
 */

'use strict'

import SettingsController from './controller'

module.exports = function (app, router) {
  /**
    * Get setting
    */
  router.get('/v1/settings', AUTH, (req, res) => {
    SettingsController({ req, res }).index()
  })

  /**
    * Get specific setting
    */
  router.get('/v1/settings/:id', AUTH, (req, res) => {
    SettingsController({ req, res }).show()
  })

  /**
    * Add new setting
    */
  router.post(
    '/v1/settings',
    EXPRESS_VALIDATOR.body('name').not().isEmpty(),
    AUTH,
    (req, res) => {
      SettingsController({ req, res }).create()
    })

  /**
    * Update the specific setting
    */
  router.patch('/v1/settings/:id', AUTH, (req, res) => {
    SettingsController({ req, res }).update()
  })

  /**
    * Remove setting
    */
  router.delete('/v1/settings/:id', AUTH, (req, res) => {
    SettingsController({ req, res }).delete()
  })
}
