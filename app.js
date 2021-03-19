const appConfig = require('./config.json')
const express = require('express')
const hbs = require('hbs');

var app = express()

app.set('view engine', 'hbs')

// Load the welcome page where users can login and register
app.get("/welcome", (req, res) => {
	res.render('welcome')
})

app.listen(appConfig.port, () => {
	console.log(`Server is running on port: ${appConfig.port}`)
})