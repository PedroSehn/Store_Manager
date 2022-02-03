const connection = require('./connection');

const getAll = async () => {
    const [rows] = await connection.query('SELECT * FROM sales');
    return rows;
};

const add = async (sales) => {
   const [salesRow] = await connection.execute('INSERT INTO sales (date) VALUE (NOW())');
   const salesID = salesRow.insertId;
   
   const salesMaping = sales.map(async (sale) => {
    const { product_id: productId, quantity } = sale;    
    await connection
        .query('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
        [salesID, productId, quantity]);
    });

    await Promise.all(salesMaping);

    return { 
        id: salesRow.insertId, 
        itemsSold: sales,
    };
};

module.exports = {
    getAll,
    add,
};