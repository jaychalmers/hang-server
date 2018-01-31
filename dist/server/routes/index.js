"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.use('/user', require('./user'));
router.use('/event', require('./event'));
router.use('/invitation', require('./invitation'));
router.use('/group', require('./group'));
module.exports = router;
