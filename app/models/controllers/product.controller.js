const Product = require('../product.model.js')


exports.create=(req,res)=>{
    if(Object.keys(req.body).length===0){
        return res.status(400).send({
            message:"Los datos del producto no pueden estar vacios"
        })
    }

    const product = new Product({
        name:req.body.name,
        price:req.body.price || 0,
        expiration: req.body.expiration || null
    })

    product.save().then(data=>{
        res.status(200).send(data)
    }).catch(err=> {
        res.status(500).send({
            message:err.message || "Ha ocurrido un error"
        })
    })

    console.log("Crear producto")
}
exports.findAll=(req,res)=>{
    Product.find().then(products=>{
        res.status(200).send(products);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })
    })
    console.log("Buscar productos")
}
exports.findOne=(req,res)=>{
    Product.findById(req.params.id).then(product=>{
        if(!product){
            return res.status(404).send({
                message:`Producto con ID no encontrado`
            })
        }
        res.status(200).send(product)
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Error"
        })
    })
    console.log("Buscar un producto")
}
exports.delete=(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(!product){
            return res.status(404).send({
                message:"ID no encontrado" + req.params.id
            })
        }
        res.status(200).send({
            message:"Producto eliminado"
        })
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })    
    })
    console.log("Eliminar producto")
}
exports.update=(req,res)=>{
    if(Object.keys(req.body).length===0){
        return res.status(400).send({
            message:"Los datos del producto no pueden estar vacios"
        })
    }
    Product.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        price:req.body.price,
        expiration: req.body.expiration || null
    },{new:true}).then(product=>{
        if(!product){
            return res.status(404).send({
                message:"Producto con ID no encontrado"+req.params.id
            })
            
        }
        res.status(200).send(product)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Error"
        })
    })

    console.log("Actualizar producto")
}