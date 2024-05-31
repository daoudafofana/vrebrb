const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            if (name.length <= 1) {
                return res.status(400).json('param trop court')
            }
            const limit = parseInt(req.query.limit) || 5;
            return Pokemon.findAndCountAll({
                where: {
                        name: { // 'name' est la prop du modele
                            [Op.like]: `%${name}%` // 'name' = critère de recherche
                        }
                    },
                limit: limit,
                order: ['name'],

            }).then(({count, rows}) => {
                const message = ' il ya '+ count +' pokemeon au total voici le le pokemon'
                res.json({message, data: rows})
            })
        } else {
            Pokemon.findAll({order: ['name']})
                .then(pokemons => {
                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({message, data: pokemons})
                })
                .catch(e => {
                    const message = "messsage pour erreur 500"
                    res.status(500).json({message, data: error})
                })
        }
    })
}