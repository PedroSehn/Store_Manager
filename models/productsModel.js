const connection = require('./connection');

const getAll = async () => {
    const [rows] = await connection.execute('SELECT * FROM products');
    return rows;
};

const add = async (name, quantity) => {
    const [result] = await connection.query('INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity]);
    return { id: result.id, name, quantity };
};

const getById = async (id) => {
    const [result] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    if (!result.length) return null;
    return result[0];
};

const getByName = async (name) => {
    const [result] = await connection.query('SELECT * FROM products WHERE name = ?', [name]);

    return result[0];
};

module.exports = {
    getAll,
    add,
    getById,
    getByName,
};