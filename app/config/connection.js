var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    console.log('DB environment values:');
    console.log('  DB_HOST =', process.env.DB_HOST);
    console.log('  DB_PORT =', process.env.DB_PORT);
    console.log('  DB_USER =', process.env.DB_USER);
    console.log('  DB_NAME =', process.env.DB_NAME);
    console.log('  DB_PASSWORD is set =', !!process.env.DB_PASSWORD);

    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'todo'
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      if (err) {
        console.error('MySQL pool getConnection error:', err);
      }
      callback(err, connection);
    });
  };
}

module.exports = new Connection();


