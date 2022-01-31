const rescue = require('express-rescue');
const products = require('express').Router();

const productService = require('../services/productService');
const { nameValidator } = require('../errors/nameValidator');
const quantityValidator = require('../errors/quantityValidator');
/* 
  C - POST
  R - GET
  U - PUT / PATCH
  D - DELETE
*/

products.post('/', 
    nameValidator,
    quantityValidator, 
    rescue(async (req, res) => {
        const { name, quantity } = req.body;
        const findByName = await productService.getByName(name);
        if (findByName) {
            return res.status(409).json({ message: 'Product already exists' });
        }
        const newProduct = await productService.add({ name, quantity });
    
        res.status(201).json(newProduct);
    }));

products.get('/', rescue(async (req, res) => {
    const productList = await productService.getAll();

    res.status(200).json(productList);
}));

module.exports = products;
