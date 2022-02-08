const productService = require('../../services/productService');
const salesService = require('../../services/salesService');

const errorMessages = {
    idIsRequired: { message: '"product_id" is required' },
    smallerOne: { message: '"quantity" must be a number larger than or equal to 1' },
    isRequiredQuantity: { message: '"quantity" is required' },
    notFound: { message: 'Sale not found' },
    amountNotPermitted: { message: 'Such amount is not permitted to sell' },
};

const validateProductId = (req, res, next) => {
    const sales = req.body;
  
    const existsId = sales.some((sale) => sale.product_id);
    const existsQuantity = sales.some((sale) => sale.quantity);
    const quantityEqualZero = sales.some((sale) => sale.quantity === 0);
  
    if (!existsId) return res.status(400).json(errorMessages.idIsRequired);
  
    if (quantityEqualZero) return res.status(422).json(errorMessages.smallerOne);
  
    if (!existsQuantity) return res.status(400).json(errorMessages.isRequiredQuantity);
  
    next();
};

const quantityIsNum = (req, res, next) => {
    const sales = req.body;
  
    sales.forEach((sale) => {
      if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
          return res.status(422).json(errorMessages.smallerOne);
    }
    });
  
    next();
};

const quantityBiggerThanOne = (req, res, next) => {
    const sales = req.body;
  
    sales.forEach((sale) => {
      const row = productService.getById(sale.product_id);
  
      if (row.quantity < sale.quantity) {
        return res.status(422).json(errorMessages.amountNotPermitted); 
    }
});
  
    next();
};

const validateSaleId = async (req, res, next) => {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);

    if (!sale[0]) return res.status(404).json({ message: 'Sale not found' });

    next();
};

module.exports = { 
    validateProductId,
    quantityIsNum,
    quantityBiggerThanOne,
    validateSaleId,
};