const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '450701',
    database: 'StoreManager',
});

module.exports = connection;