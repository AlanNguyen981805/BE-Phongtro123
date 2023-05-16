import { Op, literal } from "sequelize";

export const addConditionOr = (where, attribute, minValue, maxValue) => {
  if (typeof minValue !== "undefined" && maxValue) {
    where[attribute] = {
      [Op.between]: [minValue, maxValue],
    };
    return;
  }
  where[attribute] = {
    [Op.not]: null,
  };
};

export const addCondition = (where, attribute, value) => {
  if (value) where[attribute] = value;
};

export const addConditionJson = (where, attribute, objSearch, value) => {
  if (value && objSearch)
    where[attribute] = literal(`CAST(${attribute} AS text) LIKE '%"name":"${value}"%'`);
};
