const connection = require('./connection');

const getAll = async () => {
    const [rows] = await connection
    .query(`SELECT sp.sale_id,
      s.date,
      sp.product_id,
      sp.quantity FROM sales AS s
      JOIN sales_products AS sp
      ON s.id = sp.sale_id`);
    
    return rows;
};

const getSaleById = async (id) => {
    const [row] = await connection
    .query(`SELECT s.date, sp.product_id, sp.quantity
        FROM sales s 
        JOIN sales_products sp 
        ON s.id = sp.sale_id
        WHERE s.id = ?`, [id]);

    return row;
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

const updateSale = async (saleId, productId, quantity) => {
    await connection.execute(`UPDATE sales_products 
    SET quantity = ? 
    WHERE sale_id = ? 
    AND product_id = ?`, [quantity, saleId, productId]);
};

module.exports = {
    getAll,
    add,
    getSaleById,
    updateSale,
};
