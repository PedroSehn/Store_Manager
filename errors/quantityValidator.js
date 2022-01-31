const quantityNotNull = (quantity) => {
    if (!quantity) {
        throw new Error({
            code: 'invalid-quantity',
            message: '"quantity" is required',
            status: 400, 
         });
     }
};

const quantityIsNumber = (quantity) => {
    if (typeof quantity === 'string' || quantity <= 0) {
        throw new Error({
            code: 'invalid-quantity',
            message: '"quantity" must be a number larger than or equal to 1"',
            status: 422, 
         });
    }
};

module.exports = {
    quantityNotNull,
    quantityIsNumber,
};