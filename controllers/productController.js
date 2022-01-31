const rescue = require('express-rescue');
const products = require('express').Router();
// const joi = require('joi');
const productService = require('../services/productService');

/* 
  C - POST
  R - GET
  U - PUT / PATCH
  D - DELETE
  
  const productValidator = joi.object({
      name: joi.string().min(5).required(),
      quantity: joi.number().min(1).required(),
    });    
*/

products.post('/', rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const newProduct = await productService.add({ name, quantity });

    res.status(201).json(newProduct);
}));

products.get('/', rescue((req, res) => {
    const productList = productService.getAll();

    res.status(200).json(productList);
}));

module.exports = products;