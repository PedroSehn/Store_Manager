const salesModel = require('../models/salesModel');

const add = async (sales) => {
    const result = await salesModel.add(sales);

    return result;
};

const getAll = async () => {
    const result = await salesModel.getAll();
    return result;
};
module.exports = {
    add,
    getAll,
};