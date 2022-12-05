const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    database: 'ping_pong',
    user: 'root',
    password: ''
})

mysqlConnection.connect((err) => err ? console.log(err) : console.log('Database connected'))

module.exports = mysqlConnection