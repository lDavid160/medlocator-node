//promesa
module.exports = (app)=>{
    const users=require('../controllers/user.controller.js')
    app.post('/users',users.create)
    app.get('/users',users.findAll)
    app.get('/users/:email',users.findOne)
    app.put('/users/:email',users.update)
    app.delete('/users/:email',users.delete)
}