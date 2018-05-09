'use strict'

require('dotenv').config()

module.exports = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    STELLAR_SERVER: process.env.STELLAR_SERVER,
    FRIEND_BOT: process.env.FRIEND_BOT_URL,
}