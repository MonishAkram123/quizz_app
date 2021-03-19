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

module.exports = {isAuthenticated, isUnAuthenticated}