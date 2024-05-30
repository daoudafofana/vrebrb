/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/privateKey')


module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {

            if (!user) {
                const message = 'aucun user avec ce username';
                return res.status(400).json({message})
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(isPasswordValid) {

                    const token = jwt.sign(
                        {userId: user.id},
                                privateKey,
                        {expiresIn: '24h'}
                    )

                    const message = `L'utilisateur a été connecté avec succès`;
                    return res.json({ message, data: user, token })
                } else {
                    const message = `Mdp incorrect`;
                    return res.status(401).json({ message})
                }
            })
        }).catch(e => {
            const message = "réessayez plus tard"
            return res.status(500).json({message, data:e})
        })
    })
}