import db from "../models";

export const getOneUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Users.findOne({
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user",
        response,
      });
    } catch (error) {
      reject();
    }
  });

export const updateUserService = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      const { payload } = req.body;
      const { id } = req.user;
      if (!id) {
        reject({
          err: 1,
          msg: "Missing input",
        });
        return;
      }
      const response = await db.Users.update(payload, {
        where: { id },
      });
      resolve({
        err: response[0] == 1 ? 0 : 1,
        msg: response[0] == 1 ? "OK" : "Failed to update user",
        response: payload,
      });
    } catch (error) {
      reject(error);
    }
  });
