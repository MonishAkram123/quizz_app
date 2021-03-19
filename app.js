const appConfig = require('./config.json')
const express = require('express')

var app = express()

app.listen(appConfig.port, () => {
	console.log(`Server is running on port: ${appConfig.port}`)
})