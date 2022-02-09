const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../services/productService');
const salesService = require('../../services/salesService');
const productController = require('../../controllers/productController');


const { nameValidator } = require('../../controllers/ProductValidator/nameValidator');
const quantityValidator = require('../../controllers/ProductValidator/quantityValidator'); 

const { 
    validateProductId,
    quantityIsNum,
    quantityBiggerThanOne,
    validateSaleId,
} = require('../../controllers/SalesValidator/productSale');

describe('Testa func nameValidator (/services/productService)' , () => {
    
    const res = {};
    const req = {};
    const next = () => {};
    
    describe('Quando não vai com o nome', () => {
        before(() => {
            req.body = { quantity: 1 };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
    
        it('Retorna status 400', async () => {
            await nameValidator(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });
    })

    describe('Quando name.length < 5', async () => {
        before(() => {
            req.body = {name: 'Fone'};
      
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
          });

          it('Retorna status 422 caso nome seja menor que 5', async () => {
            await nameValidator(req, res, next);
            expect(res.status.calledWith(422)).to.be.true;
        });
    });

    describe('Quando dá tudo certo', async () => {
        before(() => {
            req.body = {name: 'Fone', quantity: 2};
      
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
          });

          it('Retorna next', async () => {
            await nameValidator(req, res, next);
            expect(res.status).to.be.an('function');
        });
    });
});

describe('Testa func quantityValidator (/services/productService)' , () => {
    const res = {};
    const req = {};
    const next = () => {};
    
    describe('Quando não vai com o quantity', () => {
        before(() => {
        req.body = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        });

        it('Retorna status 400', async () => {
            await quantityValidator(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });
    });

    describe('Quando quantity é invalido', () => {
        before(() => {
        req.body = {name: 'test', quantity: 'a'};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        });

        it('Retorna status 422', async () => {
            await quantityValidator(req, res, next);
            expect(res.status.calledWith(422)).to.be.true;
        });
    })
});

describe('Testa func validateProductId' , () => {
    
    const res = {};
    const req = {};
    const next = () => {};
    
    describe('Quando não vai com o id', () => {
        before(() => {
            req.body = [ {} ];
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        after(() => {
            sinon.restore();
        });

        it('Deve retornar status 400', async () => {
            await validateProductId(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });
    });
    
    describe('Quando o quantity < 0', () => {
        before(() => {
            req.body = [ { product_id: 1 } ];
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        after(() => {
            sinon.restore();
        });

        it('Deve retornar status 400', async () => {
            await validateProductId(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });
    });

    describe('Quando o quantity < 0', () => {
        before(() => {
            req.body = [ { product_id: 1, quantity: 0 } ];
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        after(() => {
            sinon.restore();
        });

        it('Deve retornar status 422', async () => {
            await validateProductId(req, res, next);
            expect(res.status.calledWith(422)).to.be.true;
        });
    })
});

describe('Testa func quantityIsNum' , () => {
    
    const res = {};
    const req = {};
    const next = () => {};
    
    describe('Quando quantity < 1 || quantity é uma string', () => {
            before(() => {
                req.body = [ { quantity: -1 } ];
                
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
            });
            after(() => {
                sinon.restore();
            });

            it('Retorna status 422', async () => {
                await quantityIsNum(req, res, next);
                expect(res.status.calledWith(422)).to.be.true;
            });
    })
});

describe('Testa func quantityBiggerThanOne' , () => {
    
    const res = {};
    const req = {};
    const next = () => {};
    
    describe('Retorna 422', () => {
        before(() => {
            req.body = [{ quantity: 100 }];
            sinon.stub(productService, 'getById').resolves([{ product_id: 20, quantity: 10 }]);
        });
        after(() => {
            sinon.restore();
        });

        it('Deve retornar 422', async () => {
            await quantityBiggerThanOne(req, res, next);
            expect(res.status.calledWith(422)).to.be.true;
        });
    })
});

/*
describe('Testa func validateSaleId' , () => {
    
    const res = {};
    const req = {};
    const next = () => {};
    
    describe('Quando não vai com o nome', () => {
        before(() => {
            req.params = { id: 1 }
            sinon.stub(salesService, 'getSaleById').resolves([]);
        });
        after(() => {
            sinon.restore();
        });

        it('Deve retornar 404', async () => {
            await validateSaleId(req, res, next);
            console.log(res.status);
        });
    })
});
*/

/*
    describe('Testa func nameValidator (/services/productService)' , () => {
    
    const res = {};
    const req = {};
    const next = () => {};
    
    describe('Quando não vai com o nome', () => {
        before(() => {});
        after(() => {});

        it('', async () => {});
    })
});

*/

/*
describe("Verifica o Controller de Produto", () => {
    describe('testa', () => {
        const teste1 = { name: "teste", quantity: 1 };
        before( async () => {
          sinon.stub(productService, "add").returns(teste1);
        });
        
        after(() => {
          sinon.restore();
        });

        it("Deve retornar um objeto", async () => {
            const result = await productService.add();
            expect(result).to.be.an("object");
        });
    });
});
*/