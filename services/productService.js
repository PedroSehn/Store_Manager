const productModel = require('../models/productsModel');

const getAll = () => productModel.getAll();

const getById = async (id) => {
    const product = await productModel.getById(id);

    return product;
};

const getByName = async (name) => productModel.getByName(name);

const add = async ({ name, quantity }) => {
    const result = await productModel.add(name, quantity);

    return result;
};

const updateById = async (name, quantity, id) => {
    const result = await productModel.updateById(name, quantity, id);

    return result;
};

const deleteById = async (id) => {
   await productModel.deleteById(id);  
};

module.exports = {
    getAll,
    getById,
    add,
    getByName,
    updateById,
    deleteById,
};