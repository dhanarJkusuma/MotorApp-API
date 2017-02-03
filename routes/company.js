/**
 * Created by Dhanar J Kusuma on 03/02/2017.
 */

var express = require('express');
var router = express.Router();
var companyCtrl = require('../controller/companyController');

router.post('/create', companyCtrl.insertCtrl);
router.get('/all', companyCtrl.getAllCtrl);
router.get('/get/:id', companyCtrl.getDetailCtrl);
router.put('/update/:id', companyCtrl.updateCtrl);
router.post('/update/cover/:id', companyCtrl.updateCoverCtrl);
router.delete('/delete/:id', companyCtrl.deleteCtrl);

module.exports = router;