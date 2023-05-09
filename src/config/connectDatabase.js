const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("db_phongtro123_jrcv", "db_phongtro123_jrcv_user", "RtzIjZ6sMaLb4I9bhtGbAKhAMeEWR9BW", {
  host: "dpg-chd2qim7avjcvo54d0u0-a.singapore-postgres.render.com",
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
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
