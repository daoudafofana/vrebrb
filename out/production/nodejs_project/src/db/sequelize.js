/* L’API Rest et la Base de données : Créer un modèle Sequelize */
//import ORM sequelize
const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

//import model pokemon
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')

//import all pokemons
const pokemons = require('./mock-pokemon')

//new instance de sequelize
const sequelize = new Sequelize('pokedex', 'root', '1TestDePassword@', {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

//fonction permettant d'init la db
const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        })
        bcrypt.hash('test', 10)
            .then(hash => {
                User.create( {
                    username:'daouda',
                    password: hash
                }).then(user => {
                    const message = 'creation user ok'
                    return {message, data:user}
                })
            })


        console.log('La base de donnée a bien été initialisée !')
    })
}

// export de la fonction pour l'utiliser partout
module.exports = {
    initDb, Pokemon, User
}