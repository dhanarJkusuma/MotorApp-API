/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */

var express = require('express');
var router = express.Router();
var serviceCtrl = require('../controller/serviceController');

router.post('/:motor/create', serviceCtrl.insertCtrl);
router.get('/:motor/all', serviceCtrl.getAllCtrl);
router.get('/get/:id', serviceCtrl.getCtrl);
router.put('/update/:id', serviceCtrl.updateCtrl);
router.delete('/delete/:id', serviceCtrl.removeCtrl);

module.exports = router;