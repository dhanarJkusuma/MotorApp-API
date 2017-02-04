/**
 * Created by Dhanar J Kusuma on 02/02/2017.
 */
var multer = require('multer');
var diskStorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'public/uploads/news/');
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var News = require('../model/news');


var upload = multer({
    storage : diskStorage
});

var upload_thumbnail = upload.single('thumbnail');

exports.insertCtrl = function(req, res, next){
    //upload image
    upload_thumbnail(req, res, function(err){
        if(err){
            res.json({
                success : false,
                data : {},
                error : "Error while uploading data."
            });
        }
        var news  = new News({
            title : req.body.title,
            title : req.body.content,
            thumbnail : 'http://' + req.headers.host + "/uploads/news/" + req.file.filename
        });
        news.save(function(err){
            if(!err){
                res.json({
                    success : true,
                    data : news,
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
    News.find({}, function(err, news){
        if(!err){
            res.json({
                success : true,
                data : news,
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
    News.findById(id, function(err, news){
        if(!err){
            res.json({
                success : true,
                data : news,
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
    News.findById(id, function(err, news){
        if(!err){
            if(news!=null){
                news.remove();
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
                error : "News not found."
            });
        }
    });
};

exports.updateCtrl = function(req, res, next){
    var id = req.params.id;
    News.findById(id, function(err, news){
        if(!err){
            news.title = req.body.title;
            news.content = req.body.content;
            news.save(function(err){
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
                error : "News not found."
            });
        }
    });
};

exports.updateCoverCtrl = function(req, res, next){
    upload_thumbnail(req, res, function(err){
        if(err){
            res.json({
                success : false,
                error : "Error uploading image."
            });
        }else{
            var id = req.params.id;
            News.findById(id, function(err, news){
                if(!err){
                    news.thumbnail = 'http://' + req.headers.host + "/uploads/news/" + req.file.filename;
                    news.save(function(err){
                        if(!err){
                            res.json({
                                success : true,
                                error : null
                            });
                        }
                        else{
                            res.json({
                                success : false,
                                error : "Error updating image url."
                            });
                        }
                    });
                }else{
                    res.json({
                        success : false,
                        error : "News not found."
                    });
                }
            });

        }
    });
};

