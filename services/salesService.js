const salesModel = require('../models/salesModel');

const add = async (sales) => {
    const result = await salesModel.add(sales);

    return result;
};

const getAll = async () => {
    const result = await salesModel.getAll();
    
    return result;
};

const getSaleById = async (id) => {
    const result = await salesModel.getSaleById(id);
    return result;
};
module.exports = {
    add,
    getSaleById,
    getAll,
};