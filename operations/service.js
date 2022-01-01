const Database = require('../services/database');
const Response = require('../services/response');

let CONSTANTS = require('../lib/constants');

let self = module.exports = {
    create: async function (value) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select service from ` + CONSTANTS.TABLES.SERVICE + ` where service='` + value + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    resolve(Response.already_exists);

                } else {

                    let insert = `insert into ` + CONSTANTS.TABLES.SERVICE + ` (service) values ('${value}')`;

                    let response = await Database.insert(insert)

                    resolve(Response.success)

                }

            }
            catch (e) {
                reject(e)
            }
        })
    },
    update: async function (value, id) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select service from ` + CONSTANTS.TABLES.SERVICE + ` where id='${id}'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let update = `update ` + CONSTANTS.TABLES.SERVICE + ` set service='${value}' where id='${id}'`;

                    let response = await Database.update(update)

                    resolve(Response.success)

                } else {

                    resolve(Response.does_not_exist);

                }

            }
            catch (e) {
                reject(e)
            }
        })
    },
    fetch_all: async function () {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select id, service, status from ` + CONSTANTS.TABLES.SERVICE + ` order by id desc`;

                let response = await Database.fetch(query);

                resolve({
                    ...Response.success,
                    result: response.result
                })

            }
            catch (e) {
                reject(e)
            }
        })
    },
    fetch: async function (id) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select service from ` + CONSTANTS.TABLES.SERVICE + ` where id='` + id + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let query = `select id, service, status from ` + CONSTANTS.TABLES.SERVICE + ` where id='` + id + `'`;

                    let response = await Database.fetch(query);

                    resolve({
                        ...Response.success,
                        result: response.result[0]
                    })

                } else {

                    resolve(Response.does_not_exist);

                }
            }
            catch (e) {
                reject(e)
            }
        })
    },
    delete: async function (id) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select service from ` + CONSTANTS.TABLES.SERVICE + ` where id='` + id + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let query = `delete from ` + CONSTANTS.TABLES.SERVICE + ` where id='` + id + `'`;

                    let response = await Database.delete(query);

                    resolve(Response.success)

                } else {

                    resolve(Response.does_not_exist);

                }
            }
            catch (e) {
                reject(e)
            }
        })
    },
}