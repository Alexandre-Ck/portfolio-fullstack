import mysql from 'mysql2/promise';

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return pool;
}

const db = {
  query: async (sql, params) => {
    const currentPool = getPool();
    return currentPool.query(sql, params);
  }
};

export default db;