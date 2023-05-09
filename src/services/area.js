import db from "../models";

export const getAreasService = () =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(db.Areas)
      const response = await db.Areas.findAll({ raw: true, attributes: ['code', 'value', 'min', 'max'] });
      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get areas',
        response 
      })
    } catch (error) {
      reject(error);
    }
  });
