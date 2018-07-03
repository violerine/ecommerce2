const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const cartSchema = new Schema({
    customer_id :{type: Schema.Types.ObjectId, ref:'Customer'},
    items:[]
    // {type: Schema.Types.ObjectId, ref:'Item'}
})

const Cart = mongoose.model("cart",cartSchema) 

module.exports = Cart