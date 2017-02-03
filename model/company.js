/**
 * Created by Dhanar J Kusuma on 03/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
    name : {
        type : String,
        required : true
    } ,
    logo_url : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('company', companySchema);