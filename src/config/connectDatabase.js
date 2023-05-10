const { Sequelize } = require("sequelize");
const environment = process.env.NODE_ENV;

// Option 3: Passing parameters separately (other dialects)
console.log(environment)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD || null, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions: environment === "production" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : null
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection to DB successfully");
  } catch (error) {
    console.log(error)
    console.log("Khong the connect db");
  }
};

export default connectDb;
