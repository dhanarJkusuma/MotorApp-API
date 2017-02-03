/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var express = require('express');
var router = express.Router();
var motorCtrl = require('../controller/motorController');

router.post('/create', motorCtrl.insertCtrl);

module.exports = router;