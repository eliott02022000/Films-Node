module.exports = (sequelize, DataTypes) => {

    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {

    });

}