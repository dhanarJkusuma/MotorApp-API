/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    _motor : {
        type: Schema.Types.ObjectId,
        ref : 'motor'
    },
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true,
    },
    location : {
        latitude : Number,
        longitude : Number
    }
});

module.exports = mongoose.model('motor_service', serviceSchema);