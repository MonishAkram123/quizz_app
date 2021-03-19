const mysql = require('mysql')
const appConfig = require('./config.json')

var getNewConnetion = () => {
	const connection = mysql.createConnection({
		host     : appConfig.db_host,
		user     : appConfig.db_user,
		password : appConfig.db_pass,
		database : appConfig.db_name
	})

	connection.connect()
	return connection
}

var closeConnection = (connection) => connection.end()

// Middleware to check if session is set with a user
var isAuthenticated = (req, res, next) => {
	if(req.session && req.session.user)
		next()
	else {
		res.statusCode = 401
		res.statusMessage = "Unauthorized"
		res.render("login_required")	
	}
}

// Middleware to check if session is not set
var isUnAuthenticated = (req, res, next) => {
	if(req.session && req.session.user)
		res.redirect("/quiz")
	else {	
		next()
	}
}

module.exports = {isAuthenticated, isUnAuthenticated, getNewConnetion, closeConnection}