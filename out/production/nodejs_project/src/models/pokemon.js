/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                message: "nom deja utilisé"
            },
            validate: {
                notEmpty: { message: "Ce champs de doit pas être vide"},
                notNull: {message: "Ce champs ne peut pas être null"},
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'doit etre un bn'},
                notNull: {msg: 'pt de vie requis'},
                min: {
                    args: [10],
                    message: "min 10"
                },
                max: {
                    args: [999],
                    message: "max 20"
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {message: "ce chammps doit etre un int"},
                notNull: {message: "cp requis"}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {message: "vous devez entrer une url"},
                notNull: {message: 'picture nécessaire'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() { //appliquer à chaque fois qu'on get la colonne types => // DB => API rest
                return this.getDataValue('types').split(',')
            },
            set(types) { // api rest -> db
                this.setDataValue('types', types.join())
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}