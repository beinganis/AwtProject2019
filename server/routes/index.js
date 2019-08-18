const express = require('express');
const router = express.Router(); 
passport = require('passport');
require('../config/passport');
require('./thesis.js');

const ctrlUser = require('../controller/user.controller');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/setThesis', ctrlUser.setThesis);
router.get('/getThesis', ctrlUser.getThesis);
router.get('/uploads',ctrlUser.upload);

module.exports = router; 