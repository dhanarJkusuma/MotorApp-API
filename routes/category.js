/**
 * Created by Dhanar J Kusuma on 02/02/2017.
 */
var express = require('express');
var router = express.Router();

var categoryCtrl = require('../controller/categoryController');

router.post('/create', categoryCtrl.insertCtrl);
router.get('/all', categoryCtrl.getAllCtrl);
router.get('/get/:id', categoryCtrl.getDetailCtrl);
router.put('/update/:id', categoryCtrl.updateCtrl);
router.post('/update/cover/:id', categoryCtrl.updateCoverCtrl);
router.delete('/delete/:id', categoryCtrl.deleteCtrl);

module.exports = router;