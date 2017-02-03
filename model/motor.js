/**
 * Created by Dhanar J Kusuma on 03/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var images = new Schema({
    image_url : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    }
});

var motorSchema = new Schema({
    _company : {
        type : Schema.Types.ObjectId, ref: 'company', required : true
    },
    _category : {
        type : Schema.Types.ObjectId, ref: 'category', required : true
    },
    name : {
        type : String, required : true
    },
    description : {
        type : String, required : true
    },
    thumbnail_url : {
        type : String, required :true
    },
    images : [images]
});

module.exports = mongoose.model('motor', motorSchema);