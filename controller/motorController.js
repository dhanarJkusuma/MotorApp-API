/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var Motor = require('../model/motor');
var multer = require('multer');
var diskStorage = multer.diskStorage({
   destination : function(req, file, cb){
       cb(null, 'public/uploads/motor/');
   },
    filename : function(req, file, cb){
       cb(null, Date.now() + Math.floor((Math.random() * 100) + 1) + "_" + file.originalname);
    }
});

var thumbnailStorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'public/uploads/motor/thumbnail/');
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + Math.floor((Math.random() * 100) + 1) + "_" + file.originalname);
    }
});

var upload = multer({
   storage : diskStorage
});

var uploadThumbnail = multer({
    storage : thumbnailStorage
});

var upload_images = upload.single('image');
var upload_thumbnail = uploadThumbnail.single('thumbnail');
exports.insertCtrl = function(req, res, next){
    upload_thumbnail(req, res, function(err){
        if(!err){
            var motor = new Motor;
            motor._company = req.body.company_id;
            motor._category = req.body.category_id;
            motor.name = req.body.name;
            motor.description = req.body.description;
            motor.thumbnail_url = 'http://' + req.hostname + '/motor/thumbnail/' + req.file.filename;
            motor.save(function(err){
               if(!err){
                   res.json({
                       success : true,
                       data : motor,
                       error : null
                   });
               }else{
                   console.log(err);
                   res.json({
                       success : false,
                       data : {},
                       error : "Failed to inserting data."
                   });
               }
            });
        }else{
            console.log(err);
            res.json({
                success : false,
                data : {},
                error : "Failed to uploading data."
            });
        }
    });
};

exports.getAllCtrl = function(req, res, next){
    Motor.find({}, function(err, motors){
       if(!err){
           res.json({
               success : true,
               data :  motors,
               error : null
           });
       }else{
           res.json({
                success : false,
                data : [],
                error : "Error fetching data from database."
           });
       }
    });
};

exports.getCtrl = function(req, res, next){
    var id = req.params.id;
    Motor.findById(id, function(err, motor){
       if(!err){
           if(motor!=null){
               res.json({
                    success : true,
                    data : motor,
                    error : null
               });
           }else{
               res.json({
                   success : false,
                   data : {},
                   error : 'Data motor not Found.'
               });
           }
       } else{
           res.json({
               success : true,
               data : {},
               error : 'Error while getting data from database'
           });
       }
    });
};

exports.insertImage = function(req, res, next){
  var id = req.params.id;
  Motor.findById(id, function(err, motor){
     if(!err && motor!=null){
         upload_images(req, res, function(err){
             if(!err){
                 var image = {
                     image_url : 'http://' + req.hostname + '/motor/' + req.file.filename,
                     color : req.body.color
                 };
                 motor.images.push(image);
                 motor.save(function(err){
                     if(!err){
                         res.json({
                             success : true,
                             data : motor,
                             error : null
                         });
                     }else{
                         res.json({
                             success : false,
                             data : {},
                             error : "Error while saving data."
                         });
                     }
                 });
             } else{
                 res.json({
                     success : false,
                     data : {},
                     error : "Error uploading image."
                 });
             }
         });
     }else{
         res.json({
             success : false,
             data : {},
             error : "Something Error."
         });
     }
  });
};

exports.removeImage = function(req, res, next){
    var id = req.params.id;
    console.log(req.body.color);
    Motor.update({_id : id}, { $pull : { images : { color: req.body.color }}}, { safe: true },
        function removeImageCallback(err, obj) {
            if(!err && obj){
                res.json({
                    success : true,
                    data : obj,
                    error : null
                });
            }else{
                res.json({
                    success : false,
                    data : {},
                    error : "Error while removing image"
                });
            }
        });
};

exports.updateCtrl = function(req, res, next){
    var id = req.params.id;
    var data = {};


    upload_thumbnail(req, res, function(err){
            if(!err){
                if(req.file!=null){
                    data = {
                        _company : req.body.company_id,
                        _category : req.body.category_id,
                        name : req.body.name,
                        description : req.body.description,
                        thumbnail_url : 'http://' + req.hostname + '/motor/thumbnail/' + req.file.filename
                    };
                    Motor.update({_id: id}, data, function(err, motor){
                        if(!err){
                            res.json({
                                success : true,
                                data : motor,
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
                        error : "Empty request file thumbnail."
                    });
                }

            }else{
                res.json({
                    success :false,
                    data : {},
                    error : "Error while uploading image."
                })
            }
        })


};

exports.removeCtrl = function(req, res, next){
    var id = req.params.id;
    Motor.remove({ _id : id },function(err){
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