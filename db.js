const Pool = require('pg').Pool
const pool = new Pool({
  user: 'Chell',
  host: 'localhost',
  database: 'e-commerce',
  password: 'chell',
  port: 5555
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}