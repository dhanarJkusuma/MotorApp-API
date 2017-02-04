/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    frequency : {
        type : String,
        enum : ['DAILY', 'MONTHLY', 'YEARLY'],
        required : true
    },
    begin_time : {
        type : Date,
        required : true
    },
    end_time : {
        type : Date,
        required : true
    },
    location : [Number]
});

module.exports = mongoose.model('event', eventSchema);