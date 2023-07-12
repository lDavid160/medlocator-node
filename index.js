//npm i express
//nodemon
//mongoose
//body-parser
//cors

//importamos los modulos
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser") // sirve para manipular las respuestas
const app = express();

app.use(bodyParser.urlencoded({extended:true})) // le damos la codificación
app.use(bodyParser.json())

app.use(cors())

//bd
const dbConfig = require("./config/database.config.js")
const mongoose=require("mongoose")
mongoose.Promise=global.Promise
//require('./app/models/routes/product.routes.js')(app)
require('./app/models/routes/user.routes.js')(app)
require('./app/models/routes/favorite.routes.js')(app)
mongoose.connect(dbConfig.url,dbConfig.options).then(()=>{
    console.log("Conexión a la base de datos")
}).catch(err=>{
    console.log("Conexion incorrecta a la base de datos")
    process.exit()
})

let port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.json({
        "message":"Este es un JSON"
    })
})

// no sirve con conexion del movil
app.listen(port, ()=> {
    console.log("Server is listening on port " + port)
})
