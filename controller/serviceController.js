/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */

var Service = require('../model/motorService');


exports.insertCtrl = function(req, res, next){
    //save data
    var motor_id = req.params.motor;
    var location = {
        latitude : req.body.latitude,
        longitude : req.body.longitude
    };
    var service = new Service;
    service._motor = motor_id;
    service.name = req.body.name;
    service.address = req.body.address;
    service.phone = req.body.phone;
    service.location = location;
    service.save(function(err){
        if(!err){
            res.json({
                success : true,
                data : service,
                error : null
            });
        }else{
            //console.log(err);
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
    Service.find({_motor: motor_id}, function(err, services){
        if(!err){
            res.json({
                success : true,
                data : services,
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
    Service.findById(id, function(err, service){
        if(!err && service != null){
            res.json({
                success: true,
                data : service,
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
    var data = {
        name : req.body.name,
        address : req.body.address,
        phone : req.body.phone,
        location : {
            latitude : req.body.latitude,
            longitude : req.body.longitude
        }
    };
    Service.update({_id: id}, data, function(err, service){
        if(!err){
            res.json({
                success : true,
                data : service,
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
    Service.remove({ _id : id },function(err){
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
