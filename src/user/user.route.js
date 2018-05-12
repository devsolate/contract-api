'use strict'

const express = require('express')
const controller = require('./user.controller')
const router = express.Router()

router.route('/register')
    .post(controller.register)
router.route('/profile/:email')
    .get(controller.profile)
router.route('/profile')
    .post(controller.del)
    
module.exports = router