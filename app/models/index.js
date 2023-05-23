const Sequelize = require("sequelize");
const sequelizeConect = new Sequelize("biodata_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelizeConect = sequelizeConect;

db.biodata = require("./biodata.model.js")(sequelizeConect, Sequelize);

module.exports = db;
