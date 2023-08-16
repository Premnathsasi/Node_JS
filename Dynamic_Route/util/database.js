const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'new-node',
    password: 'Prem@5522'
});

module.exports = pool.promise();