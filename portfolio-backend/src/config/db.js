import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "mysql-xxxxxx.aivencloud.com", // Remplace par ton vrai host
  user: "avnadmin",                   // Remplace par ton vrai user
  port: 28338,                        // Ton vrai port
  password: "ton_mot_de_passe",       // Ton vrai mot de passe
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false
  }
});

const db = {
  query: async (sql, params) => {
    return pool.query(sql, params);
  }
};

export default db;