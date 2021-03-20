const getNewConnetion = require('../helpers.js').getNewConnetion
const closeConnection = require('../helpers.js').closeConnection


var getNQuestions = (subject, N, cb) => {
	connection = getNewConnetion()
	let questions =  []

	query = `SELECT * FROM questions WHERE subject='${subject}' ORDER BY RAND() LIMIT ${N}`
		connection.query(query, (err, results) => {
		if(err) {
			cb(err)
		} else {
			for(var i = 0; i < results.length; i++) {
				try {
					buffer = new Buffer.from(results[i].options, 'binary').toString('utf-8');
					question = {
						"id": results[i].id,
						"subject": results[i].subject,
						"question": results[i].question_title,
						"answer": results[i].answer,
						"options": JSON.parse(buffer)
					}

					questions.push(question)
				} catch(e) {
					console.log("Error while reading question: ", e.message)
				}
			}
			cb(null, questions)
		}
	})
	closeConnection(connection)

}

module.exports = {getNQuestions}
