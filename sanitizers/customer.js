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
        body('name').trim(),
        body('name').customSanitizer(value => { return value.replace(/'/g, "''") }),
        body('contact').trim(),
        body('contact').customSanitizer(value => { return value.replace(/'/g, "''") }),
        body('service_id').trim().toInt(),
        body('start_date').trim(),
        body('start_date').customSanitizer(value => { return value.replace(/'/g, "''") }),
        body('end_date').trim(),
        body('end_date').customSanitizer(value => { return value.replace(/'/g, "''") })
    ],
    sanitizeFetch: [
        param('id').trim().toInt()
    ],
    sanitizeUpdate: [
        body('name').trim(),
        body('name').customSanitizer(value => { return value.replace(/'/g, "''") }),
        body('contact').trim(),
        body('contact').customSanitizer(value => { return value.replace(/'/g, "''") }),
        body('service_id').trim().toInt(),
        body('start_date').trim(),
        body('start_date').customSanitizer(value => { return value.replace(/'/g, "''") }),
        body('end_date').trim(),
        body('end_date').customSanitizer(value => { return value.replace(/'/g, "''") }),
        param('id').trim().toInt()
    ],
    sanitizeDelete: [
        param('id').trim().toInt()
    ]
};