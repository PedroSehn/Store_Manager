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

const updateSale = async (id, array) => {
    await Promise.all(array.map(({ product_id: productId, quantity }) => (
        salesModel.updateSale(Number(id), Number(productId), Number(quantity))
      )));
      const sale = { saleId: id, itemUpdated: array };
      return sale;
};

const deleteById = async (id) => {
    const item = getSaleById(id);

    await salesModel.deleteById(id);
   // console.log(deleteAction);
    return item;
};

module.exports = {
    add,
    getSaleById,
    getAll,
    updateSale,
    deleteById,
};