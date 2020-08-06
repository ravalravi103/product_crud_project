const mongooese = require("mongoose");
const Schema = mongooese.Schema;
const UserSChema = new Schema({
    
    name : {
        type:String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    
});

module.exports = mongooese.model('User', UserSChema);