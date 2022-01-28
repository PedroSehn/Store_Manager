const productModel = require('../models/productsModel');

const getAll = () => productModel.getAll();

const getById = async (id) => {
    const product = await productModel.getById(id);

    if (!product) {
        throw new Error({
            code: 'not-found',
            message: 'Product not found', 
        });
    }
    return product;
};

const add = async ({ name, quantity }) => {
    const result = await productModel.add(name, quantity);

    return result;
};

module.exports = {
    getAll,
    getById,
    add,
};