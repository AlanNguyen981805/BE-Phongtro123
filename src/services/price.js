import db from "../models";

export const getPriceSerivice = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Prices.findAll({ raw: true, attributes: ['code', 'value', 'min', 'max'] });
      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get prices',
        response 
      })
    } catch (error) {
      reject();
    }
  });
