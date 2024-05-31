//on recup la dependence express dans node module
const express = require('express');
const cors = require('cors');

//autres middleware
const favicon = require('serve-favicon')
const bodyParser = require("body-parser");
//import sequelize (ORM)
const sequelize= require("./src/db/sequelize");



//creation d'une instance d'une appli express ( serveur où api rest va tourner)
const app = express();
//port sur lequel demarre notre api rest ( process.env.PORT = heroku)
const port = process.env.PORT || 3000;




// Middleware: fonction qui s'applique à chaque requete http rentrante et sortante
app
    .use(favicon(__dirname + '/favicon.ico')) // en 1 d'ajouter une favicon
    .use(bodyParser.json())
    .use(cors({
            origin: ['http://127.0.0.1:5500'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
    }))// en 3 de parser en donnés des requete http entrante et sortante
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
//initialisation db et connexion db
// sequelize.initDb();

//endpoints
app.get('/', (req,res) => res.json('hello world 😀'))
require("./src/routes/findAllPokemons")(app);
//OU
// const findAllPokemons = require("./src/routes/findAllPokemons");
// findAllPokemons(app)

// const findPokemonByPk = require("./src/routes/findPokemonByPk");
// findPokemonByPk(app)
require("./src/routes/findPokemonByPk")(app)
require("./src/routes/createPokemon")(app)
require("./src/routes/updatePokemon")(app)
require("./src/routes/deletePokemon")(app)
require("./src/routes/login")(app)

//on demarre notre api rest sur le port 3000 avec un msg de confirmation
app.listen(port, () => console.log(`Notre appli est désormais sur http://www.localhost:3000 ${port} `))