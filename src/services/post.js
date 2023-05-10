import { Op } from "sequelize";
import db from "../models";
import {
  addConditionOr,
  addCondition,
  addConditionJson,
} from "../helpers/condition";

//GET ALL POSTS
export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Posts.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Images,
            as: "image",
            attributes: ["images"],
          },
          {
            model: db.Attributes,
            as: "attr",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Users,
            as: "user",
            attributes: ["name", "avatar", "fbUrl", "zalo", "phone"],
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get posts",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitService = (offset, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let where = {};
      addConditionOr(where, "price", query.minPrice, query.maxPrice);
      addConditionOr(where, "acreage", query.minAcreage, query.maxAcreage);
      addCondition(where, "categoryCode", query.categoryCode);
      addConditionJson(where, "city", "id", query.area);
      addConditionJson(where, "district", "id", query.district);
      addConditionJson(where, "ward", "id", query.ward);

      const userModelAttributes = db.Posts.rawAttributes;
      let order = [];
      if (userModelAttributes.hasOwnProperty(query.order)) {
        order = [query.order, "DESC"];
      } else {
        order = ["createdAt", "DESC"];
      }

      console.log(where);
      const response = await db.Posts.findAndCountAll({
        order: [order],
        where,
        raw: true,
        nest: true,
        // offset: offset * (+process.env.LIMIT) || 0,
        offset: 0,
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Images,
            as: "image",
            attributes: ["images"],
          },
          {
            model: db.Attributes,
            as: "attr",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Users,
            as: "user",
            attributes: ["name", "avatar", "fbUrl", "zalo", "phone"],
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get posts",
        response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getNewPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Posts.findAndCountAll({
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        // offset: offset * (+process.env.LIMIT) || 0,
        offset: 0,
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Images,
            as: "image",
            attributes: ["images"],
          },
          {
            model: db.Attributes,
            as: "attr",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get posts",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getDetailPostService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Posts.findOne({
        where: {
          id,
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Images,
            as: "image",
            attributes: ["images"],
          },
          {
            model: db.Attributes,
            as: "attr",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Users,
            as: "user",
            attributes: ["name", "avatar", "fbUrl", "zalo", "phone"],
          },
        ],
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const createPostService = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        title,
        desc,
        media,
        city,
        district,
        ward,
        price,
        acreage,
        categoryCode,
        fullAddress,
        userId,
        star,
        endDate,
        highlight,
        view,
        rentalObj,
      } = req.body;
      if (
        !title ||
        !desc ||
        !media ||
        !city ||
        !district ||
        !ward ||
        !price ||
        !acreage ||
        !categoryCode ||
        !rentalObj ||
        !fullAddress ||
        !userId
      ) {
        reject({
          err: 1,
          msg: "missing field",
          newPost,
        });
      }
      const newImages = await db.Images.create({ images: media });
      const idImages = newImages.id;

      const dataFormPost = {
        imagesId: idImages,
        title,
        address: fullAddress,
        city,
        district,
        ward,
        description: desc,
        userId,
        categoryCode,
        price,
        acreage,
        star,
        view,
        endDate,
        highlight,
        rentalObj,
      };
      const newPost = await db.Posts.create(dataFormPost);
      console.log({ newPost });
      if (newPost) {
        resolve({
          err: newPost ? 0 : 1,
          msg: newPost ? "OK" : "Failed to create post",
        });
      }
    } catch (error) {
      console.log(">>>>>>>", { error });
      reject(error);
    }
  });

export const updatePostService = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        idPost,
        title,
        desc,
        media,
        city,
        district,
        ward,
        price,
        acreage,
        categoryCode,
        fullAddress,
        star,
        endDate,
        highlight,
        view,
        rentalObj,
      } = req.body;
      if (
        !title ||
        !desc ||
        !media ||
        !city ||
        !district ||
        !ward ||
        !price ||
        !acreage ||
        !categoryCode ||
        !rentalObj ||
        !fullAddress ||
        !idPost
      ) {
        reject({
          err: 1,
          msg: "missing field",
          newPost,
        });
      }
      const newImages = await db.Images.create({ images: media });
      const idImages = newImages.id;

      const dataFormPost = {
        imagesId: idImages,
        title,
        address: fullAddress,
        city,
        district,
        ward,
        description: desc,
        categoryCode,
        price,
        acreage,
        star,
        view,
        endDate,
        highlight,
        rentalObj,
      };
      const newPost = await db.Posts.update(dataFormPost, {
        where: { id: idPost },
      });
      resolve({
        err: newPost ? 0 : 1,
        msg: newPost ? "OK" : "Failed to update post",
        newPost,
      });
    } catch (error) {
      console.log({ error });
      reject(error);
    }
  });

export const getPostsAdminService = (offset, id, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let where = {};
      addConditionOr(
        where,
        "price",
        parseFloat(query.minPrice),
        parseFloat(query.maxPrice)
      );
      addConditionOr(
        where,
        "acreage",
        parseFloat(query.minAcreage),
        parseFloat(query.maxAcreage)
      );
      addCondition(where, "categoryCode", query.categoryCode);
      addCondition(where, "userId", id);

      console.log(where);
      const response = await db.Posts.findAndCountAll({
        where,
        raw: true,
        nest: true,
        // offset: offset * (+process.env.LIMIT) || 0,
        offset: 0,
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Images,
            as: "image",
            attributes: ["images"],
          },
          {
            model: db.Attributes,
            as: "attr",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Users,
            as: "user",
            attributes: ["name", "avatar", "fbUrl", "zalo", "phone"],
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get posts",
        response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const deletePostService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Posts.destroy({ where: { id } });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to delete post",
        response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
