//promesa
module.exports = (app)=>{
    const favorites=require('../controllers/favorite.controller.js')
    app.post('/favorites',favorites.create)
    app.get('/favorites',favorites.findAll)
    app.get('/favorites/:username_favorite',favorites.findOne)
    app.put('/favorites/:username_favorite',favorites.update)
    app.delete('/favorites/:username_favorite',favorites.delete)
}