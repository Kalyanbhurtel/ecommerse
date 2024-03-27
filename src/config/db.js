import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'password1A@',
    database: process.env.DB_DATABASE || 'ecommerce',
    port: process.env.DB_PORT || 3306
});

export default pool;