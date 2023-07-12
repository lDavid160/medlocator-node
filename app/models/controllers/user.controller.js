const User = require('../user.model.js')


exports.create=(req,res)=>{
    if(Object.keys(req.body).length===0){
        return res.status(400).send({
            message:"Los datos del user no pueden estar vacios"
        })
    }

    const user = new User({
        _id:req.body._id,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone_number:req.body.phone_number || null,
        expiry:req.body.expiry
    })

    user.save().then(data=>{
        res.status(200).send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message || "Ha ocurrido un error Create"
        })
    })

    console.log("Crear User")
}
exports.findAll=(req,res)=>{
    User.find().then(users=>{
        res.status(200).send(users);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })
    })
    console.log("Buscar users")
}
exports.findOne=(req,res)=>{
    User.findById(req.params.email).then(user=>{
        if(!user){
            return res.status(404).send({
                message:`User con email ${req.params.email} no encontrado`
            })
        }
        res.status(200).send(user)
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Error"
        })
    })
    console.log("Buscar un user")
}
exports.delete=(req,res)=>{
    User.findByIdAndRemove(req.params.email).then(user=>{
        if(!user){
            return res.status(404).send({
                message:"Email no encontrado" + req.params.email
            })
        }
        res.status(200).send({
            message:"User eliminado"
        })
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })    
    })
    console.log("Eliminar user")
}
exports.update=(req,res)=>{
    if(Object.keys(req.body).length===0){
        return res.status(400).send({
            message:"Los datos del user no pueden estar vacios"
        })
    }
    User.findByIdAndUpdate(req.params.email,{
        _id:req.body._id,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone_number:req.body.phone_number || null,
        expiry:req.body.expiry
        
    },{new:true}).then(user=>{
        if(!user){
            return res.status(404).send({
                message:"User con Email no encontrado"+req.params.email
            })
            
        }
        res.status(200).send(user)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })
    })

    console.log("Actualizar user")
}