const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_chat',
    password: 'W@rn3v3r3nd$'
});

module.exports = pool.promise();