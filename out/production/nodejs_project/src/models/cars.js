module.export = (sequelize, DataTypes) => {
    return sequelize.define("cars", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            modele: {
                type: DataTypes.STRING,
                notNull: true
            }
        },
        {
            timestamp: true,
            createdAt: 'created',
            updatedAt: false
        });
}