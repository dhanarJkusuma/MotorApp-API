/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */

var express = require('express');
var router = express.Router();
var featureCtrl = require('../controller/featureController');

router.post('/:motor/create', featureCtrl.insertCtrl);
router.get('/:motor/all', featureCtrl.getAllCtrl);
router.get('/get/:id', featureCtrl.getCtrl);
router.post('/update/:id', featureCtrl.updateCtrl);
router.delete('/delete/:id', featureCtrl.removeCtrl);

module.exports = router;