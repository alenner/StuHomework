var mysql = require('mysql')

exports.base = (sql, data, callback) => {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '134233',
    port: '3306',
    database: 'studenthw'
  })
  connection.connect()
  connection.query(sql, data, function (err, results) {
    if (err) {
      return callback(err)
    }
    callback(results)
    console.log('数据连接成功')
  })
// connection.end();
}
