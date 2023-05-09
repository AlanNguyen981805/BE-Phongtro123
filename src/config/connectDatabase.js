const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("phontro123", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection to DB successfully");
  } catch (error) {
    console.log("Khong the connect db");
  }
};

export default connectDb;
