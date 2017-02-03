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

var upload_images = upload.any();
var upload_thumbnail = uploadThumbnail.single('thumbnail');
exports.insertCtrl = function(req, res, next){
    upload_thumbnail(req, res, function(err){
        if(!err){
            var motor = new Motor;
            motor._company = req.body.company_id;
            motor._category = req.body.category_id;
            motor.name = req.body.name;
            motor.description = req.body.description;
            motor.thumbnail_url = 'http://' + req.hostname + '/motor/thumbnail' + req.file.filename;
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
     if(!err){
         if(motor!=null){

         }else{

         }
     } else{

     }
  });
};