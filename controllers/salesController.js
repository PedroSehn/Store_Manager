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
  const newSaleList = salesList.map((item) => {
    const { sale_id: saleId, ...data } = item;
    
    const newObject = { saleId, ...data };
    return newObject;
  });

  res.status(200).json(newSaleList);
}));

sales.get('/:id', 
  rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
}));

sales.put('/:id',
  validateProductId,
  quantityIsNum,
  quantityBiggerThanOne,
  rescue(async (req, res) => {
  const { id } = req.params;
  const array = req.body;
  const result = await salesService.updateSale(id, array);

  return res.status(200).json({ ...result });
}));

module.exports = sales;