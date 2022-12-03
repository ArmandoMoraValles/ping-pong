const mysqlConnection = require('../DB/connection')

const query = async (sql, args) => {
    return await new Promise((resolve, reject) => {
        mysqlConnection.query(sql, args, (err, rows) => {
            if(err) reject(err)
            resolve(rows)
        })
    })
}

module.exports = query