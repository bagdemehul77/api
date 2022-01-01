const Database = require('../services/database');
const Response = require('../services/response');

let CONSTANTS = require('../lib/constants');

let self = module.exports = {
    create: async function (username, password) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select username from ` + CONSTANTS.TABLES.LOGIN + ` where username='` + username + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    resolve(Response.already_exists);

                } else {

                    let insert = `insert into ` + CONSTANTS.TABLES.LOGIN + ` (username, password) values ('${username}', '${password}')`;

                    let response = await Database.insert(insert)

                    resolve(Response.success)

                }

            }
            catch (e) {
                reject(e)
            }
        })
    },
    update: async function (id,username,password) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select id from ` + CONSTANTS.TABLES.LOGIN + ` where Id='${id}'`;

                let is_exist = await Database.is_exist(query);
                console.log(is_exist)
                if (is_exist === 1) {

                    // let update = `update ` + CONSTANTS.TABLES.LOGIN + ` set name='${name}', contact='${contact}', start_date='${start_date}', end_date='${end_date}', service='${service_id}' where id='${id}'`;
                    let query = `UPDATE `+CONSTANTS.TABLES.LOGIN+ ` set username='${username}', password='${password}' WHERE Id=${id}`;
                    console.log(query)
                    let response = await Database.update(query)
                    console.log(response)
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
                // let query = `select username from ` + CONSTANTS.TABLES.LOGIN + ` where username='` + username + `'`;

                let query = `select * from ` + CONSTANTS.TABLES.LOGIN ;

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

                let query = `select * from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + id + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let query = `select * from ` + CONSTANTS.TABLES.LOGIN +  ` where id='` + id + `'`;

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

                let query = `select * from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + id + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let query = `delete from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + id + `'`;

                    let response = await Database.delete(query);

                    resolve(Response.success)

                } else {

                    resolve(Response.does_not_exist);

                }
            }
            catch (e) {
                console.log(e)
                reject(e)
            }
        })
    },
}