const Database = require('../services/database');
const Response = require('../services/response');

let CONSTANTS = require('../lib/constants');

let self = module.exports = {
    create: async function (name, contact, service_id, start_date, end_date) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select contact from ` + CONSTANTS.TABLES.CUSTOMER + ` where contact='` + contact + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    resolve(Response.already_exists);

                } else {

                    let insert = `insert into ` + CONSTANTS.TABLES.CUSTOMER + ` (name, contact, service, start_date, end_date) values ('${name}', '${contact}', '${service_id}', '${start_date}', '${end_date}')`;

                    let response = await Database.insert(insert)

                    resolve(Response.success)

                }

            }
            catch (e) {
                reject(e)
            }
        })
    },
    update: async function (name, contact, service_id, start_date, end_date, id) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select service from ` + CONSTANTS.TABLES.CUSTOMER + ` where id='${id}'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let update = `update ` + CONSTANTS.TABLES.CUSTOMER + ` set name='${name}', contact='${contact}', start_date='${start_date}', end_date='${end_date}', service='${service_id}' where id='${id}'`;

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

                let query = `select c.id, c.name, c.contact, s.service, c.start_date, c.end_date from ` + CONSTANTS.TABLES.CUSTOMER + ` c left join ` + CONSTANTS.TABLES.SERVICE + ` s on s.id = c.service order by c.id desc`;

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

                let query = `select contact from ` + CONSTANTS.TABLES.CUSTOMER + ` where id='` + id + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let query = `select c.id, c.name, c.contact, s.service, c.start_date, c.end_date, s.id service_id from ` + CONSTANTS.TABLES.CUSTOMER + ` c left join ` + CONSTANTS.TABLES.SERVICE + ` s on s.id = c.service where c.id='` + id + `'`;

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

                let query = `select * from ` + CONSTANTS.TABLES.CUSTOMER + ` where id='` + id + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let query = `delete from ` + CONSTANTS.TABLES.CUSTOMER + ` where id='` + id + `'`;

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