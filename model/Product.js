const monggose = require('mongoose');
const Schema = monggose.Schema;

const productsSchema = new Schema({
     title : {
         type : String,
         required : true
     },
     desc : {
         type : String,
         required : true
     },
     image : {
         type : String,
         required : true
     },
     price : {
         type : Number,
         required : true
     }
});


module.exports = monggose.model('Product', productsSchema);