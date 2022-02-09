const connection = require('./connection');

const getAll = async () => {
    const [rows] = await connection.execute('SELECT * FROM products');
    return rows;
};

const add = async (name, quantity) => {
    const [result] = await connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity]);
    return { id: result.insertId, name, quantity };
};

const getById = async (id) => {
    const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return result[0];
};

const getByName = async (name) => {
    const [result] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);

    return result[0];
};

const updateById = async (name, quantity, id) => {
    await connection.execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', 
    [name, quantity, id]);

    return {
        id, name, quantity,
    };
};

const deleteById = async (id) => {
    await connection.execute('DELETE FROM products WHERE id = ?', [id]);
    return true;
};

module.exports = {
    getAll,
    add,
    getById,
    getByName,
    updateById,
    deleteById,
};