'use strict'

const User = require('./user.model');
const StellarSdk = require('stellar-sdk');
const Crypto = require('../utils/crypto');

const register = async (req, res) => {
    const { email, name, password } = req.body

    try {
        const generateKeyPair = StellarSdk.Keypair.random();
        const encryptedPrivateKey = Crypto.encrypt(generateKeyPair.rawSecretKey(), password);
        const address = generateKeyPair.publicKey()

        const user = await User.add(email, name, address);
        console.log("Success:", user.email)
        return res.json({
            status: 200,
            user: user,
            encryptedSecretKey: encryptedPrivateKey
        })
    } catch(error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            error: error
        })
    }
}


const profile = async (req, res) => {
    const { email } = req.params

    try {
        const user = await User.get(email)
        return res.json({
            status: 200,
            user: user
        })
    } catch(error) {
        return res.status(400).json({
            status: 400,
            error: error
        })
    }
}

const del = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.remove(email)
        return res.json({
            status: 200,
            user: user
        })
    } catch(error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            error: error
        })
    }
}
module.exports = {
    register,
    profile,
    del
}