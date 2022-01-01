try {
    const Operations = require('../operations/service');
    const Response = require('../services/response');

    exports.read_all = async (req, res, next) => {
        try {

            let response = await Operations.fetch_all();

            res.status(response.code).send(response);

        }
        catch (error) {

            res.status(Response.internal_server_error.code).send(Response.internal_server_error)

        }
    }

    exports.read = async (req, res, next) => {
        try {

            let { id } = req.params;

            let response = await Operations.fetch(id);

            res.status(response.code).send(response);

        }
        catch (error) {

            res.status(Response.internal_server_error.code).send(Response.internal_server_error)

        }
    }

    exports.update = async (req, res, next) => {
        try {

            let { service } = req.body;

            let { id } = req.params;

            let response = await Operations.update(service, id);

            res.status(response.code).send(response);

        }
        catch (error) {

            res.status(Response.internal_server_error.code).send(Response.internal_server_error)

        }
    }

    exports.create = async (req, res, next) => {
        try {

            let { service } = req.body;

            let response = await Operations.create(service);

            res.status(response.code).send(response);

        }
        catch (error) {

            res.status(Response.internal_server_error.code).send(Response.internal_server_error)

        }
    }

    exports.delete = async (req, res, next) => {
        try {

            let { id } = req.params;

            let response = await Operations.delete(id);

            res.status(response.code).send(response);

        }
        catch (error) {

            res.status(Response.internal_server_error.code).send(Response.internal_server_error)

        }
    }

} catch (e) {
    console.log(e)
}