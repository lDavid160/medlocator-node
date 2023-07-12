//cada .model hace referencia a una tabla en la bd (esto se llama mda)

const mongoose = require("mongoose")

const FavoriteSchema = mongoose.Schema({
    _id:{
        type:String,
        trim:true
    },
    username_favorite:{
        type:String,
        index:true,
        unique:true,
        trim:true
    },
    username:{
        type:String
    },
    favorite_name:{
        type:String,
    },
    favorite_custom_name:{
        type:String,
    }

},{
    // permite crear facilmente otras columnas de forma automatica como creation time
    timestamps:true
})

module.exports = mongoose.model("Favorites",FavoriteSchema)