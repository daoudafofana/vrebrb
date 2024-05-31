const { Pokemon } = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        // update (2parameters(body, {where: {}})
        Pokemon.update(req.body, {
            where: {
                id: id
            }
        }).then(() => {
            return Pokemon.findByPk(id).then(pokemonUpdated => {
                if (pokemonUpdated === null) {
                    return res.status(404).json("existe pas")
                }
                const message ='okok'
                res.json({message, data: pokemonUpdated})
            })
        })
            .catch(e => {
                if (e instanceof ValidationError) {
                    return res.status(400).json({message: e.message, data:e})
                }
                if (e instanceof  UniqueConstraintError) {
                    return res.status(400).json({message: e.message, data:e})
                }
                const message = "messsage pour erreur 500"
                res.status(500).json({message, data:e})
            })
    })
}