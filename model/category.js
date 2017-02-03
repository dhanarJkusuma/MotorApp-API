/**
 * Created by Dhanar J Kusuma on 02/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
   name : {
       type : String,
       required : true
   },
    image_url :{
       type : String,
       required : true
    }
});

module.exports = mongoose.model('category', categorySchema);

