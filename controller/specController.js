/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */

var Specification = require('../model/motorSpec');


exports.insertCtrl = function(req, res, next){
    //save data
    var motor_id = req.params.motor;
    var specification = new Specification({
        _motor : motor_id,
        spec_key : req.body.spec_key,
        spec_value : req.body.spec_value
    });
    specification.save(function(err){
        if(!err){
            res.json({
                success : true,
                data : specification,
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



};

exports.getAllCtrl = function(req, res, next){
    var motor_id = req.params.motor;
    Specification.find({_motor: motor_id}, function(err, specs){
        if(!err){
            res.json({
                success : true,
                data : specs,
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
    Specification.findById(id, function(err, spec){
        if(!err && spec != null){
            res.json({
                success: true,
                data : spec,
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
    Specification.update({id: id}, req.body, function(err, spec){
        if(!err){
            res.json({
                success : true,
                data : spec,
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
};

exports.removeCtrl = function(req, res, next){
    var id = req.params.id;
    Specification.remove({ _id : id },function(err){
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