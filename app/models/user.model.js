//cada .model hace referencia a una tabla en la bd (esto se llama mda)

const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    _id:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        index:true,
        unique:true,
        trim:true
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    phone_number:{
        type:String,
    },
    expiry:{
        type:Number,
    }

},{
    // permite crear facilmente otras columnas de forma automatica como creation time
    timestamps:true
})

module.exports = mongoose.model("Users",UserSchema)