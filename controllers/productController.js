const rescue = require('express-rescue');
const products = require('express').Router();

const productService = require('../services/productService');
const { nameValidator } = require('../errors/ProductValidator/nameValidator');
const quantityValidator = require('../errors/ProductValidator/quantityValidator');

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

products.get('/:id', rescue(async (req, res) => {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
}));

products.put('/:id',
nameValidator,
quantityValidator, 
rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productService.getById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const newProduct = await productService.updateById(name, quantity, id);
    
    res.status(200).json(newProduct);
}));

products.delete('/:id', rescue(async (req, res) => {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    productService.deleteById(id);
   return res.status(200).json(product);
}));
module.exports = products;
