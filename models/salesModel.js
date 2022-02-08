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
        .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
        [salesID, productId, quantity]);
    
    await connection.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?',
    [quantity, productId]);
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

const deleteById = async (id) => {
   const result = await getSaleById(id);
    console.log(id);

    await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);

    const mapping = result.map(async (item) => {
        await connection.execute(
            'UPDATE products SET quantity = quantity + ? WHERE id = ?',
            [item.quantity, item.product_id],
        );
    });

    await Promise.all(mapping);

    return result;
};
module.exports = {
    getAll,
    add,
    getSaleById,
    updateSale,
    deleteById,
};
