const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const secret = stage.JWT_SECRET;
var pool = require('../connections/mysql');
const Database = require('../services/database');
const Response = require('../services/response');
const { body, param, validationResult } = require('express-validator');

module.exports = {
    sanitizeCreate: [
        body('service').trim(),
        body('service').customSanitizer(value => { return value.replace(/'/g, "''") })
    ],
    sanitizeFetch: [
        param('id').trim().toInt()
    ],
    sanitizeUpdate: [
        body('service').trim(),
        body('service').customSanitizer(value => { return value.replace(/'/g, "''") }),
        param('id').trim().toInt()
    ],
    sanitizeDelete: [
        param('id').trim().toInt()
    ]
};