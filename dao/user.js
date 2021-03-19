const getNewConnetion = require('../helpers.js').getNewConnetion
const closeConnection = require('../helpers.js').closeConnection
var findOne = (username, password, cb) => {
	query = `SELECT * FROM students WHERE username='${username}' AND password='${password}';`
	connection = getNewConnetion()
	connection.query(query, (err, results) => {
		if(err) {
			cb(err)
		} else if(!results || results.length < 1) {
			cb("Username password mismatch!!")
		} else {
			cb(null, {'username': results[0].username})
		}
	})

	closeConnection(connection)
}

var createNew = (user, cb) => {
	query = `INSERT INTO students(username, password) VALUES('${user.username}', '${user.password}');`
	connection = getNewConnetion()
	connection.query(query, (err, results) => cb(err))
	closeConnection(connection)
}

module.exports = {findOne, createNew}