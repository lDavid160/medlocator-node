const Favorite = require('../favorite.model.js')


exports.create=(req,res)=>{
    if(Object.keys(req.body).length===0){
        return res.status(400).send({
            message:"Los datos del favorite no pueden estar vacios"
        })
    }

    const favorite = new Favorite({
        _id:req.body._id,
        username_favorite:req.body.username_favorite,
        username:req.body.username,
        favorite_name:req.body.favorite_name,
        favorite_custom_name:req.body.favorite_custom_name || null
    })

    favorite.save().then(data=>{
        res.status(200).send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message || "Ha ocurrido un error Create"
        })
    })

    console.log("Crear Favorite")
}
exports.findAll=(req,res)=>{
    Favorite.find().then(favorite=>{
        res.status(200).send(favorite);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })
    })
    console.log("Buscar favorites")
}
exports.findOne=(req,res)=>{
    Favorite.findById(req.params.username_favorite).then(favorite=>{
        if(!favorite){
            return res.status(404).send({
                message:`Favorite con key ${req.params.username_favorite} no encontrado`
            })
        }
        res.status(200).send(favorite)
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Error"
        })
    })
    console.log("Buscar un favorite")
}
exports.delete=(req,res)=>{
    Favorite.findByIdAndRemove(req.params.username_favorite).then(favorite=>{
        if(!favorite){
            return res.status(404).send({
                message:"Key no encontrado" + req.params.username_favorite
            })
        }
        res.status(200).send({
            message:"Favorite eliminado"
        })
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })    
    })
    console.log("Eliminar favorite")
}
exports.update=(req,res)=>{
    if(Object.keys(req.body).length===0){
        return res.status(400).send({
            message:"Los datos del favorite no pueden estar vacios"
        })
    }
    Favorite.findByIdAndUpdate(req.params.username_favorite,{
        _id:req.body._id,
        username_favorite:req.body.username_favorite,
        username:req.body.username,
        favorite_name:req.body.favorite_name,
        favorite_custom_name:req.body.favorite_custom_name || null
    },{new:true}).then(favorite=>{
        if(!favorite){
            return res.status(404).send({
                message:"Favorite con key no encontrado"+req.params.username_favorite
            })
            
        }
        res.status(200).send(favorite)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })
    })

    console.log("Actualizar favorite")
}