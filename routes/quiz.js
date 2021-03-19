const router = require('express').Router();
const uuid = require('uuid-random')

const questionsDao = require('../dao/questions.js')
const appConfig = require('../config.json')
const currentQuizes = {}

// TODO: load subjects and render it on quiz_home page
router.get("/", (req, res) => {
	res.render("quiz_home")
})

router.get("/:subject", (req, res) => {
	subject = req.params.subject
	questions = questionsDao.getNQuestions(subject, appConfig.max_question_per_quiz)
	new_test_id = uuid()
	currentQuizes[new_test_id] = {questions, subject}
	questions_to_render = []

	// Do not send answers to user instead check after submit
	for(let i = 0 ; i < questions.length; i++) {
		question = questions[i]
		questions_to_render.push({"question": question.question, "id": question.id, "options": question.options})
	}

	res.render("test_page", {"data": {"questions": questions_to_render, "test_id": new_test_id}})

})

router.post("/submit", (req, res) => {
	console.log(req.body)
	res.render("score_page")
})

module.exports = router