const rescue = require('express-rescue');
const sales = require('express').Router();

const salesService = require('../services/salesService');
const productService = require('../services/productService');
const { 
    validateProductId,
    quantityIsNum,
    quantityBiggerThanOne,
} = require('../errors/SalesValidator/productSale');

sales.post('/', 
  validateProductId,
  quantityIsNum,
  quantityBiggerThanOne,
  rescue(async (req, res) => {
    const salesList = req.body;
   
    const saleValidation = salesList.map(async (sale) => {
      const id = sale.product_id;
      const product = await productService.getById(id);
      if (product === null) return res.status(404).json({ message: 'product not found' });
    }); 
    
    await Promise.all(saleValidation);

    const result = await salesService.add(salesList);
    return res.status(201).json(result);
}));

sales.get('/', rescue(async (req, res) => {
  const salesList = await salesService.getAll();
  
  return res.status(200).json(salesList);
}));

module.exports = sales;