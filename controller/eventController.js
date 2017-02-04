/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */

var Event = require('../model/event');

var locQuery = function(coords, distance){
    return { location: { $near: { $geometry: { type: "Point", coordinates: coords }, $maxDistance: parseInt(distance)}}}
};

exports.insertCtrl = function(req, res, next){
    //save data

    var location = [
        req.body.latitude,
        req.body.longitude
    ];
    var event = new Event;
    event.title = req.body.title;
    event.description = req.body.description;
    event.frequency = req.body.frequency;
    event.begin_time = req.body.begin_time;
    event.end_time = req.body.end_time;
    event.location = location;
    event.save(function(err){
        if(!err){
            res.json({
                success : true,
                data : event,
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

exports.getAreaEventCtrl = function(req ,res, next){
    var coordinate = [
        req.body.latitude,
        req.body.longitude
    ];

    Event.find(locQuery(coordinate, 10),function(err, events){
        if(!err){
            res.json({
                success : true,
                data : events,
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

exports.getAllCtrl = function(req, res, next){
    Event.find({}, function(err, events){
        if(!err){
            res.json({
                success : true,
                data : events,
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
    Event.findById(id, function(err, event){
        if(!err && event != null){
            res.json({
                success: true,
                data : event,
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
        title : req.body.name,
        description : req.body.address,
        frequency : req.body.frequency,
        begin_time : req.body.begin_time,
        end_time : req.body.end_time,
        location : [
            req.body.latitude,
            req.body.longitude
        ]
    };
    Event.update({_id: id}, data, function(err, event){
        if(!err){
            res.json({
                success : true,
                data : event,
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
    Event.remove({ _id : id },function(err){
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
