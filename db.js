const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');
const { STRING } = Sequelize;


const Event = conn.define('event', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    }
});
const syncAndSeed = async() => {
    await conn.sync({force: true});

    const org1Event1 = await Event.create({name: 'Welcome Event'});
    const org2Event1 = await Event.create({name: 'Meet and Greet'});
};

module.exports = {
    conn,
    syncAndSeed,
    Event
}