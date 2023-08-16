const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'new-node',
    password: 'Prem@5522'
});

module.exports = pool.promise();