'use strict'

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const ipfs = new IPFS()
const dbName = 'contract.users'
const orbitdb = new OrbitDB(ipfs)
const FriendBot = require('../utils/friendbot')

const add = (email, name, address) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await orbitdb.keyvalue(dbName)
            await db.load()

            const profile = await db.get(email)

            if(!profile) {
                const result = await db.set(email, { 
                    email: email, 
                    name: name, 
                    address: address
                })
                
                await FriendBot.fund(address)
                const profile = await db.get(email)
                resolve(profile)
            } else {
                reject("user exist")
            }
        } catch(error) {
            reject(error)
        }
    })
}

const get = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await orbitdb.keyvalue(dbName)
            await db.load()

            const profile = await db.get(email)
            if(profile) {
                resolve(profile)
            } else {
                reject("user not exist")
            }
        } catch(error) {
            reject(error)
        }
    });
}


const remove = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await orbitdb.keyvalue(dbName)
            await db.load()

            const profile = await db.set(email, null)
            if(profile) {
                resolve(profile)
            } else {
                reject("user not exist")
            }
        } catch(error) {
            reject(error)
        }
    });
}

module.exports = {
    add,
    get,
    remove
}