import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT, 10) || 3306, // 100% sécurisé pour Vercel désormais
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Requis par Aiven pour accepter les connexions sécurisées en prod
  }
});

export default pool;