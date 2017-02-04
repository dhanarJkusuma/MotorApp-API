/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var express = require('express');
var router = express.Router();
var motorCtrl = require('../controller/motorController');

router.post('/create', motorCtrl.insertCtrl);
router.get('/all', motorCtrl.getAllCtrl);
router.get('/get/:id', motorCtrl.getCtrl);
router.post('/update/:id', motorCtrl.updateCtrl);
router.delete('/delete/:id', motorCtrl.removeCtrl);
router.post('/create/:id/images', motorCtrl.insertImage);
router.delete('/remove/:id/images/', motorCtrl.removeImage);

module.exports = router;