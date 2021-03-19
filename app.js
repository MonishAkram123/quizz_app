const appConfig = require('./config.json')
const bodyParser = require("body-parser");
const express = require('express')
const hbs = require('hbs');
const session = require('express-session')

const user_dao = require('./dao/user.js')
const isAuthenticated = require('./helpers.js').isAuthenticated
const isUnAuthenticated = require('./helpers.js').isUnAuthenticated
const quizRouter = require('./routes/quiz.js')

var app = express()

app.use(express.static(__dirname +'/public/'));
app.use(bodyParser.urlencoded({ extended: true }));

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
app.get("/login", isUnAuthenticated, (req, res) => {res.render('login_page')})

// Post call to log user in
app.post('/login', isUnAuthenticated, (req, res) => {
	// TODO: remove with actual code that can log a user in and set cookie with user data
	let user = user_dao.findOne(req.body.username, req.body.password, (err, result) => {
		if(err) {
			console.log(`Error while login: ${err}`)
			res.redirect("/login")
		} else {
			console.log("session started with: ", result)
			req.session.user = result
			// After login, redirect to quiz home page.
			res.redirect("/quiz")
		}
	})
})

app.get("/register", isUnAuthenticated, (req, res) => {res.render('register_page')})

app.post("/register", isUnAuthenticated, (req, res) => {
	user_dao.createNew({"username": req.body.username, "password": req.body.password}, (err) => {
		if(err) {
			console.log("Error while creating user:", err.message)
		}

		res.redirect("/login")
	})
})


app.post("/logout", isAuthenticated, (req, res) => {
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