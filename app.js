const appConfig = require('./config.json')
const express = require('express')
const quizRouter = require('./routes/quiz.js')
const isAuthenticated = require('./helpers.js').isAuthenticated
const isUnAuthenticated = require('./helpers.js').isUnAuthenticated
const session = require('express-session')
const hbs = require('hbs');

var app = express()

app.use(express.static(__dirname +'/public/'));

// To handle session
app.use(session({
    name: appConfig.session_id,
    secret: appConfig.session_secret,
    resave: false,
    saveUninitialized: false
}))

// All paths starting with /quiz requires Authentication
app.use("/quiz", isAuthenticated, quizRouter)

app.set('view engine', 'hbs')

// Load the login page where users can login or register
app.get("/login", isUnAuthenticated, (req, res) => {
	res.render('login_page')
})

// Post call to log user in
app.post('/login', isUnAuthenticated, (req, res) => {
	// TODO: remove with actual code that can log a user in and set cookie with user data
	req.session.user = {"name": "404NotFound"}
	// After login, redirect to quiz home page.
	res.redirect("/quiz")
})

app.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if(err)
			console.log(`Error while destroying session: ${err}`)
	})

	//Redirect to login page
	res.redirect("/login")
})

app.listen(appConfig.port, () => {
	console.log(`Server is running on port: ${appConfig.port}`)
})