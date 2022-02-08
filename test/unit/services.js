const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const productService = require('../../services/productService');
const salesService = require('../../services/salesService');

const connection = require('../../models/connection');

// PRODUCT TEST

describe('Testa função getAll (services/productService)', () => {
    describe('Quando existe ao menos 1 produto', () => {
        before(async () => {
            const element = [{ id: 1, name: 'navalha', quantity: 12}]
            sinon.stub(productModel, 'getAll').resolves(element);
        });
        after(async () => {
            productModel.getAll.restore();
        });

        it('Deve retornar um array', async () => {
            const result = await productService.getAll();

            expect(result).to.be.an('array');
        });

        it('Deve retornar um array', async () => {
            const result = await productService.getAll();

            expect(result).to.not.be.empty;
        });
    });
});

describe('Testa função getById (services/productService)', () => {
    describe('Quando encontra um item', () => {
        before(async () => {
            const element = { id: 1, name: 'navalha', quantity: 12 };
            sinon.stub(productModel, 'getById').resolves(element);
        });
        after(() => {
            productModel.getById.restore();
        });

        it('Deve retornar um objeto', async () => {
            const result = await productService.getById(1)
            expect(result).to.be.an('object');
        });

        it('Deve ter aschaves id, name, quantity', async () => {
            const result = await productService.getById(1)
            expect(result).to.have.property('id');
            expect(result).to.have.property('name');
            expect(result).to.have.property('quantity');
        });
    });

    describe('Quando não tem produto', () => {
        before(async () => {
            const element = {};
            sinon.stub(productModel, 'getById').resolves(element);
        });
        after(() => {
            productModel.getById.restore();
        });

        it('Deve retornar um objeto', async () => {
            const result = await productService.getById(1)
            expect(result).to.be.an('object');
        });

        it('Deve retornar um objeto vazio', async () => {
            const result = await productService.getById(1)
            expect(result).to.be.empty;
        });
    });
});

describe('Testa função getByName (services/productService)', () => {
    describe('Quando existe um produto', () => {
        before(async () => {
            const element = { id: 1, name: 'navalha', quantity: 12 };
            sinon.stub(productModel, 'getByName').resolves(element);
        });
        after(() => {
            productModel.getByName.restore();
        });

        it('Deve retornar um objeto', async () => {
            const result = await productService.getByName(1)
            expect(result).to.be.an('object');
        });

        it('Deve ter aschaves id, name, quantity', async () => {
            const result = await productService.getByName(1)
            expect(result).to.have.property('id');
            expect(result).to.have.property('name');
            expect(result).to.have.property('quantity');
        });
    });
});

describe('Testa função add (services/productService)', () => {
    describe('Quando um produto é adicionado com sucesso', () => {
        before(async () => {
            const element = { id: 1, name: 'navalha', quantity: 12 };
            sinon.stub(productModel, 'add').resolves(element);
        });
        after(() => {
            productModel.add.restore();
        });

        it('Deve retornar um object', async () => {
            const result = await productService.add('navalha', 12);
            expect(result).to.be.an('object');
        });

        it('Deve ter aschaves id, name, quantity', async () => {
            const result = await productService.add('navalha', 12);
            expect(result).to.have.property('id');
            expect(result).to.have.property('name');
            expect(result).to.have.property('quantity');
        });
    });
});

describe('Testa função updateById (services/productService)', () => {
    describe('Quando um produto é atualizado com sucesso', () => {
        before(async () => {
            const element = { id: 1, name: 'navalha', quantity: 12 };
            sinon.stub(productModel, 'updateById').resolves(element);
        });
        after(() => {
            productModel.updateById.restore();
        });
        
        it('Deve retornar um object', async () => {
            const result = await productService.updateById('navalha', 12, 1);
            expect(result).to.be.an('object');
        });

        it('Deve ter aschaves id, name, quantity', async () => {
            const result = await productService.updateById('navalha', 12, 1);
            expect(result).to.have.property('id');
            expect(result).to.have.property('name');
            expect(result).to.have.property('quantity');
        });
    });
});

describe('Testa função deleteById (services/productService)', () => {
    describe('Quando deleta com sucesos', () => {
        before(async () => {
            const element = undefined;
            sinon.stub(productModel, 'deleteById').resolves(element);
        });
        after(() => {
            productModel.deleteById.restore();
        });

        it('Deve retornar undefine', async () => {
            const result = await productService.deleteById(1);
            expect(result).to.be.undefined;
        });
    });
});

// SALES TEST

describe('Testa função add (services/salesService)', () => {
    describe('Quando o cadastro é um sucesso', () => {
        const itemSale=[{ product_id: 1, quantity: 2}]
        before(async () => {
            const element = [{ insertId: 1 }];
            sinon.stub(salesModel, 'add').resolves(element);
        });
        after(() => {
            salesModel.add.restore();
        });
        
        it('Deve retornar um object', async () => {
            const result = await salesService.add(itemSale);
        });
    });

});

describe('Testa função getAll (services/salesService)', () => {
    describe('Quando existe ao menos uma venda', () => {
        before(async () => {
            const salesElement =  
            [
              {
                "saleId": 1,
                "date": "2021-09-09T04:54:29.000Z",
                "product_id": 1,
                "quantity": 2
              }
            ];
            sinon.stub(connection, 'query').resolves([salesElement]);
          });
          after(() => {
            connection.query.restore();
          });
        
        it('Deve retornar um array', async () => {
            const result = await salesService.getAll();

            expect(result).to.be.an('array');
        });

        it('Deve retornar um array', async () => {
            const result = await salesService.getAll();

            expect(result).to.not.be.empty;
        });
    });

});

describe('Testa função getSaleById (services/salesService)', () => {
    describe('Quando encontra o sale', () => {
        before(async () => {
            const element =  
            [
              { 
                "date": "2021-09-09T04:54:29.000Z",
                "product_id": 1,
                "quantity": 2
              }
            ];
      
            sinon.stub(connection, 'query').resolves([element]);
          });
          after(() => {
            connection.query.restore();
          });
        
          it('Deve retornar um array', async () => {
            const result = await salesService.getSaleById();
      
            expect(result).to.be.an('array');
          });

          it('Deve conter um objeto', async () => {
            const result = await salesService.getSaleById();
            
            expect(result[0]).to.be.an('object');
          });
    });
});

describe('Testa função updateSale (services/salesService)', () => {
    describe('Quando uma venda é atualizada com sucesso', async() => {
        const itemSale = [{
          product_id: 1,
          quantity: 1
        }];
    
        before(async () => {
          const execute = [];
    
          sinon.stub(connection, 'execute').resolves(execute);
        });
    
        after(() => {
          connection.execute.restore();
        });
    
        it('Deve retornar um objeto', async () => {
          const result = await salesService.updateSale(1, itemSale);
          expect(result).to.be.an('object');
        });

        it('Deve ter saleId, itemUpdated', async () => {
            const result = await salesService.updateSale(1, itemSale);
            expect(result).to.be.have.property('itemUpdated');
            expect(result).to.be.have.property('saleId');
          });
    });
});
