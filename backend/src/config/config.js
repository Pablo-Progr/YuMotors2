const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.db_host, 
    port: process.env.db_port,
    database: process.env.db_name,
    user: process.env.db_user,
    password: process.env.db_password
});



module.exports = db;
