module.exports = (sequelize, DataTypes) => {

    return sequelize.define('distributeurs', {
    
        id_distributeur: { type: DataTypes.INTEGER, primaryKey: true },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpostal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ville: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pays: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        timestamps: false,
    });

}