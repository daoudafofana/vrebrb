const { Pokemon } = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons', auth, (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `le pokemon ${req.body.name} a été ajouté`;
                res.json({message, date:pokemon})
            })
            .catch(e => {
                if (e instanceof ValidationError) {
                    return res.status(400).json({message: e.message, data:e})
                }
                if (e instanceof  UniqueConstraintError) {
                    return res.status(400).json({message: e.message, data:e})
                }
                const message = "messsage pour erreur 500"
                res.status(500).json({message, data:error})
            })
    })
}