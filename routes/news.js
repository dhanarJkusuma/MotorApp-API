/**
 * Created by Dhanar J Kusuma on 02/02/2017.
 */
var express = require('express');
var router = express.Router();

var newsCtrl = require('../controller/newsController');

router.post('/create', newsCtrl.insertCtrl);
router.get('/all', newsCtrl.getAllCtrl);
router.get('/get/:id', newsCtrl.getDetailCtrl);
router.put('/update/:id', newsCtrl.updateCtrl);
router.post('/update/cover/:id', newsCtrl.updateCoverCtrl);
router.delete('/delete/:id', newsCtrl.deleteCtrl);

module.exports = router;