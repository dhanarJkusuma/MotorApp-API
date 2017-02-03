/**
 * Created by Dhanar J Kusuma on 03/02/2017.
 */
var Company = require('../model/company');
var multer = require('multer');

var diskStorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'public/uploads/company/');
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage : diskStorage
});

var upload_logo = upload.single('logo');

exports.insertCtrl = function(req, res, next){
    upload_logo(req , res, function(err){
       if(!err){
           var company = new Company();
           company.name = req.body.name;
           company.logo_url = "http://" + req.hostname + '/uploads/company/' + req.file.filename;
           company.save(function(err){
               if(!err){
                   res.json({
                       success : true,
                       data : company,
                       error : null
                   });
               }else{
                    res.json({
                        success : false,
                        data : {},
                        error : "Error while inserting data."
                    })
               }
           });
       } else{
           console.log(err);
            res.json({
                success : false,
                data : {},
                error : "Error while uploading image."
            });
       }
    });
};

exports.getAllCtrl = function(req, res, next){
    Company.find({}, function(err, companies){
        if(!err){
            res.json({
                success : true,
                data : companies,
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
    Company.findById(id, function(err, company){
        if(!err){
            res.json({
                success : true,
                data : company,
                error : null
            });
        }
        else{
            res.json({
                success : false,
                data : {},
                error : "Company not found."
            });
        }
    });
};

exports.deleteCtrl = function(req, res, next){
    var id = req.params.id;
    Company.findById(id, function(err, company){
        if(!err){
            if(company!=null){
                company.remove();
                res.json({
                    success : true,
                    error : null
                });
            }
            res.json({
                success : false,
                error : "Data not found."
            });
        }
        else{
            res.json({
                success : false,
                error : "Company not found."
            });
        }
    });
};

exports.updateCtrl = function(req, res, next){
    var id = req.params.id;
    Company.findById(id, function(err, company){
        if(!err){
            company.name = req.body.name;
            company.save(function(err){
                if(!err){
                    res.json({
                        success : true,
                        data : company,
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
                error : "Company not found."
            });
        }
    });
};

exports.updateCoverCtrl = function(req, res, next){
    upload_logo(req, res, function(err){
        if(err){
            res.json({
                success : false,
                error : "Error uploading image."
            });
        }else{
            var id = req.params.id;
            Company.findById(id, function(err, company){
                if(!err){
                    company.logo_url = "http://" + req.hostname + '/uploads/company/' + req.file.filename;
                    company.save(function(err){
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

