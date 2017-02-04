/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */

var express = require('express');
var router = express.Router();
var accessoriesCtrl = require('../controller/accessoriesController');

router.post('/:motor/create', accessoriesCtrl.insertCtrl);
router.get('/:motor/all', accessoriesCtrl.getAllCtrl);
router.get('/get/:id', accessoriesCtrl.getCtrl);
router.post('/update/:id', accessoriesCtrl.updateCtrl);
router.delete('/delete/:id', accessoriesCtrl.removeCtrl);

module.exports = router;