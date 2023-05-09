import db from "../models";

//GET ALL CATEGORY
export const getCategoriesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Categories.findAll({ raw: true, attributes: ['code', 'value', 'header', 'subHeader'] });
      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get categories',
        response 
      })
    } catch (error) {
      reject();
    }
  });
