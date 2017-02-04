/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var multer = require('multer');
var Feature = require('../model/motorFeature');
var diskStorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'public/uploads/feature/');
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
    upload_image(req, res, function(err){
       if(!err){
           if(req.file!=null){
               //save data
               var feature = new Feature;
               feature._motor = req.params.motor;
               feature.title = req.body.title;
               feature.description = req.body.description;
               feature.image_url = 'http://' + req.hostname + '/uploads/feature/' + req.file.filename
               feature.save(function(err){
                   if(!err){
                       res.json({
                           success : true,
                           data : feature,
                           error : null
                       });
                   }else{
                       res.json({
                           success : false,
                           data : {},
                           error : "Error while saving data to the database."
                       });
                   }
               });
           } else{
             res.json({
                 success : false,
                 data : {},
                 error : "Empty request file image."
             })
           }

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
    Feature.find({_motor: motor_id}, function(err, features){
        if(!err){
            res.json({
                success : true,
                data : features,
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
    Feature.findById(id, function(err, feature){
        if(!err && feature != null){
            res.json({
                success: true,
                data : feature,
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
        data = {
            title : req.body.title,
            description: req.body.description,
            image_url : 'http://' + req.hostname + '/uploads/feature/' + req.file.filename
        };
        Feature.update({_id: id},data,function(err, feature){
            if(!err){
                res.json({
                    success : true,
                    data : feature,
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
    });
};

exports.removeCtrl = function(req, res, next){
    var id = req.params.id;
    Feature.remove({ _id : id },function(err){
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