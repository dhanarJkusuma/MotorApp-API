/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var express = require('express');
var router = express.Router();
var eventCtrl = require('../controller/eventController');

router.post('/:motor/create', eventCtrl.insertCtrl);
router.get('/:motor/all', eventCtrl.getAllCtrl);
router.get('/:motor/nearby', eventCtrl.getAreaEventCtrl);
router.get('/get/:id', eventCtrl.getCtrl);
router.put('/update/:id', eventCtrl.updateCtrl);
router.delete('/delete/:id', eventCtrl.removeCtrl);

module.exports = router;