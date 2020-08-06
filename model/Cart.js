const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartSchema = new Schema({
    title : {
        type :String,
        required : true
    },
    quantity: {
        type: Number,
        required : true
    },
    total : {
        type : Number,
        required : true
    }
});


module.exports = mongoose.model('Cart',cartSchema);