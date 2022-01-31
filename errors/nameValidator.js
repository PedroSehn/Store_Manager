// import productServer from '../services/productService';

/*
const existsByName = async (name) => {
    const product = await productServer.getByName(name);
    
    if (!product) {
        return false;
    }
    throw new Error({
        code: 'invalid-name',
        message: 'Product already exists', 
        status: 409,
     });
};
*/

const nameNotNull = (name) => {
       if (!name) {
           throw new Error({
               code: 'invalid-name',
               message: '"name" is required',
               status: 400, 
            });
        }
};

const nameLenghtValidator = (name) => {
    if (name.length < 5) {
        throw new Error({
            code: 'invalid-name',
            message: '"name" length must be at least 5 characters long', 
            status: 422,
         });
     }
};

const verify = (name) => {
    nameNotNull(name);
    nameLenghtValidator(name);
    // existsByName(name); 
};

verify('');

module.exports = {
    // existsByName,
    nameNotNull,
    nameLenghtValidator,
    verify,
};