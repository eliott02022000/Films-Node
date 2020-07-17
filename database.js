const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('cinema', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889,
    logging: false
});

const Film = require('./models/Film')(sequelize, DataTypes);
const Genre = require('./models/Genre')(sequelize, DataTypes);
const Distributeurs = require('./models/Distributeurs')(sequelize, DataTypes);
const User = require('./models/User')(sequelize, DataTypes);

sequelize.sync({
    alter: {
        drop: false
    }
})

module.exports = {
    sequelize: sequelize,
    Film: Film,
    User: User,
    Distributeurs: Distributeurs,
    Genre: Genre,
}