'use strict';

const express = require('express');
const router = express.Router();

router.use('/', require('./ipfs/ipfs.route'));

module.exports = router;