const express = require("express");
const router = express.Router();

// Cron Reports
const midnight_cron = require('../jobs/midnight_cron');

// Brands Route
const boiler_plate_route = require('../routes/boiler_plate')

// Service Route
const service_route = require('../routes/service')

// Customer Route
const customer_route = require('../routes/customer')

// Login Route
const login_route = require('../routes/login')

// Users
router.use('/boiler-plate', boiler_plate_route)

// Service
router.use('/service', service_route)

// Customer
router.use('/customer', customer_route)

// Customer
router.use('/login', login_route)

// Scheduled Jobs
// router.use('/cron', midnight_cron)

module.exports = router;
