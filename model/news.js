
/**
 * Created by Dhanar J Kusuma on 04/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('news', newsSchema);