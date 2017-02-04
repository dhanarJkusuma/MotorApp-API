/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */

var express = require('express');
var router = express.Router();
var specificationCtrl = require('../controller/specController');

router.post('/:motor/create', specificationCtrl.insertCtrl);
router.get('/:motor/all', specificationCtrl.getAllCtrl);
router.get('/get/:id', specificationCtrl.getCtrl);
router.put('/update/:id', specificationCtrl.updateCtrl);
router.delete('/delete/:id', specificationCtrl.removeCtrl);

module.exports = router;