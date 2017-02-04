/**
 * Created by Dhanar J Kusuma on 03/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accessoriesSchema = new Schema({
    _motor : {
        type : Schema.Types.ObjectId,
        ref : 'motor'
    },
    name : {
        type : String,
        required :true
    },
    description : {
        type : String,
        required: true
    },
    image_url : {
        type : String,
        required : true
    }
});


module.exports = mongoose.model('motor_accssories', accessoriesSchema);