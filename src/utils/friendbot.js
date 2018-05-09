'use strict'

const axios = require('axios')
const Constants = require('../constants')

const fund = (publicKey) => {
    return axios.get(Constants.FRIEND_BOT, {
        params: {
            addr: publicKey
        }
    })
}

module.exports = {
    fund
}