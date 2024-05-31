const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
        return Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                const message = '<<<<voiici le pokemon>>>>'
                res.json({ message, data: pokemon })
            })
            .catch(e => console.error("erreur: ", e));
    })
}