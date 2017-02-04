/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var multer = require('multer');
var Accessories = require('../model/motorAccesories');
var diskStorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'public/uploads/accessories');
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + '_' + file.originalname);
    }
});

var upload = multer({
    storage : diskStorage
});

var upload_image = upload.single('image');

exports.insertCtrl = function(req, res, next){
    console.log(req.body);
    upload_image(req, res, function(err){
        if(!err){
            //save data
            var accessories = new Accessories;
            accessories._motor = req.params.motor;
            accessories.name = req.body.name;
            accessories.description = req.body.description;
            accessories.image_url = 'http://' + req.hostname + '/uploads/accessories/' + req.file.filename
            accessories.save(function(err){
                if(!err){
                    res.json({
                        success : true,
                        data : accessories,
                        error : null
                    });
                }else{
                    console.log(err);
                    res.json({
                        success : false,
                        data : {},
                        error : "Error while saving data to the database."
                    });
                }
            });
        }else{
            res.json({
                success : false,
                data : {},
                error : "Error while uploading image."
            });
        }
    });
};

exports.getAllCtrl = function(req, res, next){
    var motor_id = req.params.motor;
    Accessories.find({_motor: motor_id}, function(err, accessories){
        if(!err && accessories!=null){
            res.json({
                success : true,
                data : accessories,
                error : null
            });
        }else{
            res.json({
                success : false,
                data : {},
                error : "Error while fetching data from database."
            });
        }
    });
};

exports.getCtrl = function(req, res, next){
    var id = req.params.id;
    Accessories.findById(id, function(err, accessories){
        if(!err && accessories != null){
            res.json({
                success: true,
                data : accessories,
                error : null
            });
        }else{
            res.json({
                success: false,
                data : {},
                error : "Error while getting data from the database."
            });
        }
    });
};

exports.updateCtrl = function(req, res, next){
    var id = req.params.id;
    var data = {};

    upload_image(req, res, function(err){
        if(req.file!=null){
            data = {
                name : req.body.name,
                description: req.body.description,
                image_url : 'http://' + req.hostname + '/uploads/accessories/' + req.file.filename
            };
            Accessories.update({_id: id},data,function(err, accessories){
                if(!err){
                    res.json({
                        success : true,
                        data : accessories,
                        error : null
                    });
                }else{
                    res.json({
                        success : false,
                        data : {},
                        error : "Error while updating data."
                    });
                }
            });
        }else{
            res.json({
                success : false,
                data : {},
                error : "Empty request file image."
            });
        }

    })

};

exports.removeCtrl = function(req, res, next){
    var id = req.params.id;
    Accessories.remove({ _id : id },function(err){
        if(!err){
            res.json({
                success : true,
                error : null
            });
        }else{
            res.json({
                success : true,
                error : null
            });
        }
    });
};