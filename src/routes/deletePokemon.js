const {Pokemon} = require("../db/sequelize")
const auth = require('../auth/auth')


module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                return res.status(404).json("existe pas")
            }
            const pokemonDeleted = pokemon;
             return Pokemon.destroy({
                where: {id: pokemon.id}
            })
                .then(() => {
                    const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                    res.json({message, data: pokemonDeleted})
                })
        })
            .catch(error => {
                res.status(500).json("erreur 500", e)
            })
    })
}