const mysql = require("mysql2");

const pool = mysql.createPool({
  database: "user_manager",
  user: "root",
  password: "12345678",
  host: "localhost",
  port: 3306,
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.log("kết nối thất bại");
  } else {
    console.log("kết nối thành công");
  }
});

module.exports = pool.promise();
