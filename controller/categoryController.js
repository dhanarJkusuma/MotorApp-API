/**
 * Created by Dhanar J Kusuma on 02/02/2017.
 */
var multer = require('multer');
var diskStorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'public/uploads/category');
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var Category = require('../model/category');


var upload = multer({
    storage : diskStorage
});

var upload_cover = upload.single('cover');

exports.insertCtrl = function(req, res, next){
    //upload image
    upload_cover(req, res, function(err){
        if(err){
            res.json({
                success : false,
                data : {},
                error : "Error while uploading data."
            });
        }

        console.log(req.file);
        var category = new Category({
            name : req.body.name,
            image_url : 'http://' + req.headers.host + "/uploads/category/" + req.file.filename
        });
        category.save(category, function(err){
            if(!err){
                res.json({
                    success : true,
                    data : category,
                    error : null
                });
            }else{
                res.json({
                    success : false,
                    data : {},
                    error : "Error while inserting data."
                });
            }
        });
    });
};

exports.getAllCtrl = function(req, res, next){
    Category.find({}, function(err, categories){
        if(!err){
            res.json({
                success : true,
                data : categories,
                error : null
            });
        }
        else{
            res.json({
                success : false,
                data : [],
                error : "Error while fetching data from database."
            });
        }

    });
};

exports.getDetailCtrl = function(req, res, next){
    var id = req.params.id;
    Category.findById(id, function(err, category){
       if(!err){
           res.json({
               success : true,
               data : category,
               error : null
           });
       }
       else{
           res.json({
               success : false,
               data : {},
               error : "Category not found."
           });
       }
    });
};

exports.deleteCtrl = function(req, res, next){
    var id = req.params.id;
    Category.findById(id, function(err, category){
        if(!err){
            if(category!=null){
                category.remove();
                res.json({
                    success : true,
                    error : null
                });
            }else{
                res.json({
                    success : false,
                    error : "Data not found."
                });
            }

        }
        else{
            res.json({
                success : false,
                error : "Category not found."
            });
        }
    });
};

exports.updateCtrl = function(req, res, next){
    var id = req.params.id;
    Category.findById(id, function(err, category){
       if(!err){
           category.name = req.body.name;
           category.save(function(err){
               if(!err){
                   res.json({
                       success : true,
                       data : category,
                       error : null
                   });
               }else{
                   res.json({
                       success : false,
                       data : {},
                       error : "Error updating data."
                   });
               }
           });
       }else{
           res.json({
               success : false,
               data : {},
               error : "Category not found."
           });
       }
    });
};

exports.updateCoverCtrl = function(req, res, next){
  upload_cover(req, res, function(err){
     if(err){
         res.json({
             success : false,
             error : "Error uploading image."
         });
     }else{
         var id = req.params.id;
         Category.findById(id, function(err, category){
            if(!err){
                category.image_url = 'http://' + req.headers.host + "/uploads/category/" + req.file.filename;
                category.save(function(err){
                    if(!err){
                        res.json({
                            success : true,
                            error : null
                        });
                    }
                    else{
                        res.json({
                            success : false,
                            error : "Error updateing image url."
                        });
                    }
                });
            }else{
                res.json({
                    success : false,
                    error : "Category not found."
                });
            }
         });

     }
  });
};

