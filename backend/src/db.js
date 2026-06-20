const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Função usada para operações simples
const query = (text, params) => pool.query(text, params);

// Transações
async function transaction(operar) {
  const conexao = await pool.connect();
  try {
    await conexao.query('BEGIN');
    const result = await operar(conexao);
    await conexao.query('COMMIT');
    return result;
  } catch (err) {
    await conexao.query('ROLLBACK');
    throw err;
  } finally {
    conexao.release();
  }
}

module.exports = { query, transaction };
