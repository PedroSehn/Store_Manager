const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const connection = require('../../models/connection');

// PRODUCT TEST

describe('Testando a função getAll (models/productModel)', () => {
    describe('Quando existe pelo menos um produto', () => {  
      before(async () => {
        const element = [{ id: 1, name: 'teste1', quantity: 2 }];
        sinon.stub(connection, 'execute').resolves([element]);
      });
  
      after(() => { 
        connection.execute.restore();
      });
        
          it('retorna um array', async () => {
            const response = await productModel.getAll();
            expect(response).to.be.an('array');
          });
      
          it('o array não está vázio', async () => {
            const response = await productModel.getAll();
            expect(response).to.not.be.empty;
          });

          it('deve conter um objeto', async () => {
            const response = await productModel.getAll();
            expect(response[0]).to.be.a('object');
          });

          it('objeto deve conter id, quantity e name', async () => {
            const response = await productModel.getAll();
            expect(response[0]).to.have.property('id');
            expect(response[0]).to.have.property('quantity');
            expect(response[0]).to.have.property('name');
          })
  
    });
    
    describe('Quanto não existe produtos', () => {
      
      before(async () => {
        const elemento = [];
        sinon.stub(connection, 'execute').resolves([elemento]);
      });

      after(() => {
        connection.execute.restore();
      });
  
      it('retorna um array', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.empty;
      })

      it('array deve estar vazio', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.empty;
      });
    });
});

describe('Testando função getById (models/productModel)' , () => {
  describe('Quando existe ao menos um produto', () => {
    before(async () => {
      const element = [{id: 1, name: 'teste2', quantity: 2}]
      sinon.stub(connection, 'execute').resolves([[element]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.an('array');
    });

    it('array não está vazio',async () => {
      const response = await productModel.getById(1);
      expect(response).to.not.be.empty;
    });

    it('array contem um objeto',async () => {
      const response = await productModel.getById(1);
      expect(response[0]).to.be.an('object');
    });
    
    it('objeto contém id, name, quantity', async () => {
      const response = await productModel.getById(1);
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('name');
      expect(response[0]).to.have.property('quantity');
    });
  })

  describe('Quando não encontra nenhum produto', () => {
    before(async () => {
      const element = []
      sinon.stub(connection, 'execute').resolves([[element]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array', async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.an('array');
    });

    it('O array deve estar vazio', async () => {
      const response = await productModel.getById(1);
      expect(response).to.be.empty;
    });
  });
  
});

describe('Testando função getByName (models/productModel)' , () => {
  describe('Quando existe ao menos um produto', () => {
    before(async () => {
      const element = [{id: 1, name: 'teste3', quantity: 2}]
      sinon.stub(connection, 'execute').resolves([[element]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productModel.getByName('navalha');
      expect(response).to.be.an('array');
    });

    it('array não está vazio',async () => {
      const response = await productModel.getByName('navalha');
      expect(response).to.not.be.empty;
    });

    it('array contem um objeto',async () => {
      const response = await productModel.getByName('navalha');
      expect(response[0]).to.be.an('object');
    });
    
    it('objeto contém id, name, quantity', async () => {
      const response = await productModel.getByName('navalha');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('name');
      expect(response[0]).to.have.property('quantity');
    });
  })

  describe('Quando não encontra nenhum produto', () => {
    before(async () => {
      const element = []
      sinon.stub(connection, 'execute').resolves([[element]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array', async () => {
      const response = await productModel.getByName('navalha');
      expect(response).to.be.an('array');
    });

    it('O array deve estar vazio', async () => {
      const response = await productModel.getByName('navalha');
      expect(response).to.be.empty;
    });
  });
});

describe('Testa função updateById (models/productModel)' , () => {
  describe('Quando existe ao menos um produto', () => {
    before(async () => {
      const element = [{id: 1, name: 'teste4', quantity: 2}]
      sinon.stub(connection, 'execute').resolves([element]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um objeto', async () => {
      const response = await productModel.updateById('navalha', 2, );

      expect(response).to.be.an('object');
    });

    it('O objeto nao pode estar vazio', async () => {
      const response = await productModel.updateById('navalha', 2, 2);

      expect(response).to.not.be.empty;
    });

    it('Objeto deve conter id, name, quantity', async () => {
      const response = await productModel.updateById('navalha', 2, 2);

      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
      expect(response).to.have.property('id');
    });
  });

  describe('Quando não encontra o produto', () => {
    before(async () => {
      const element = {}
      sinon.stub(connection, 'execute').resolves([element]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um objeto', async () => {
      const response = await productModel.updateById('navalha', 2, );

      expect(response).to.be.an('object');
    });

    it('Objeto deve ter prorpiedades id, name, quantity', async () => {
      const response = await productModel.updateById('navalha', 2, );

      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });

    /*
    it('As propriedades deve ser iguais os parametros', async () => {
      
    });
    */
  });
});

describe('Testa função add (models/productModel)', () => {
  describe('Quando um produto é adicionado com sucesso', async () => {
    const { name, quantity } = {
      name: 'teste5', 
      quantity: '2'
    };

    before(async () => {
      const elemento = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(elemento);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um objeto', async () => {
      const result = await productModel.add(name, quantity);

      expect(result).to.be.an('object');
    });

    it('Objeto deve conter id, name, quantity', async () => {
      const result = await productModel.add(name, quantity);

      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });
  });
});

describe('Testa função deleteById (models/productModel)', () => {
  before(async () => {
    const element = {};
    sinon.stub(connection, 'execute').resolves(element);
  });

  after(() => {
    connection.execute.restore();
  });
  
  it('A função deve acontecer', async () => {
    const result = await productModel.deleteById();

    expect(result).to.be.true;
  });
});

// SALES TEST

describe('Testa função getAll (models/salesModel)', () => {
  describe('Quando existe pelo menos 1 venda', async() => {
    before(async () => {
      const salesElement =  [
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

    it('Deve retornar um Array', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
    });

    it('Array deve conter um objeto', async () => {
      const result = await salesModel.getAll();

      expect(result[0]).to.be.an('object');
    });

    it('Objeto deve conter saleId, date, product_id ,quantity', async () => {
      const result = await salesModel.getAll();

      expect(result[0]).to.have.property('saleId');
      expect(result[0]).to.have.property('date');
      expect(result[0]).to.have.property('product_id');
      expect(result[0]).to.have.property('quantity');
    });

    it('', async () => {});




  });

  describe('Quando nao existem vendas', async() => {
    before(async () => {
      const element = [];

      sinon.stub(connection, 'query').resolves([element]);
    });

    after(() => {
      connection.query.restore();
    })

    it('Deve retornar um array', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
    })

    it('Deve retornar um array vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.empty;
    })
  });
});

describe('Testa função getSaleById (models/salesModel)', () => {
  describe('Quando existe o produto procurado', async() => {
    before(async () => {
      const element =  [
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
      const result = await salesModel.getSaleById();

      expect(result).to.be.an('array');
    });

    it('Deve conter um objeto', async () => {
      const result = await salesModel.getSaleById();
      
      expect(result[0]).to.be.an('object');
    });

    it('Objeto deve conter date, product_id, quantity', async () => {
      const result = await salesModel.getSaleById();

      expect(result[0]).to.have.property('date');
      expect(result[0]).to.have.property('product_id');
      expect(result[0]).to.have.property('quantity');
    });

  });
});

describe('Testa função add (models/salesModel)', () => {
  describe('Quando a venda é cadastrada com sucesso', async() => {
    const itemSale=[{ product_id: 1, quantity: 2}]

    before(async () => {
      const element = [{ insertId: 1 }]
      
      sinon.stub(connection, 'execute').resolves([element]);
    });
    after(() => {
      connection.execute.restore();
    });


    it('Deve retornar um objeto', async () => {
      const result = await salesModel.add(itemSale);

      expect(result).to.be.an('object');
    });

    it('O objeto deve conter id, itemsSold',async () => {
      const result = await salesModel.add(itemSale);

      expect(result).to.have.property('id');
      expect(result).to.have.property('itemsSold');
    });

    it('itemsSold deve ser um array',async () => {
      const result = await salesModel.add(itemSale);

      expect(result.itemsSold).to.be.an('array');
    });
  });
});

describe('Testa função updateSale (models/salesModel)', () => {
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

    it('Não retorna nada', async () => {
      const result = await salesModel.updateSale(1, itemSale);
      expect(result).to.be.an('undefined');
  
    });
  });
});

