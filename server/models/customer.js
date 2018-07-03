const mongoose = require("mongoose")
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name:String,
    username: {
        type: String,
        unique: true
    },
    password: String,
})


const Customer = mongoose.model("customer",customerSchema)

module.exports=Customer