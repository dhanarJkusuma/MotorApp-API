/**
 * Created by Dhanar J Kusuma on 03/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var specSchema = new Schema({
    _motor : {
        type : Schema.Types.ObjectId,
        ref : 'motor'
    },
    spec_key : {
        type : String,
        required : true
    },
    spec_value : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('motor_spec', specSchema);