//cada .model hace referencia a una tabla en la bd (esto se llama mda)

const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        index:true,
        unique:true,
        trim:true,
        minlength:5
    },
    price:{
        type: Number,
        min: 10
    },
    expiration:Date,

},{
    // permite crear facilmente otras columnas de forma automatica como creation time
    timestamps:true
})

module.exports = mongoose.model("Product",ProductSchema)