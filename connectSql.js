
const mysql = require('mysql')

const wf = require('./waterflow.js')

const f = ({ sql, config: { host, port, user, password, database } }) => {


return new Promise((resolve, reject) => {
	const sql = mysql.createConnection({ host, port, user, password, database })
	sql.connect(err => {
		if (err) return reject(err)
		console.log('connect success')
		resolve({ sql })
	})
})

}

module.exports = wf(f)
