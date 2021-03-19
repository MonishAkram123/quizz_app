var getNQuestions = (subject, N) => {
	return [{ 
		"subject": "physics", 
		"question": "Who Invented Gravity?",
		"id": 1,
		"options": ["You", "Me", "God", "Newton"],
		"answer": "God"
	}, {
		"subject": "physics", 
		"question": "Who Invented Light?",
		"id": 2,
		"options": ["You", "Me", "God"],
		"answer": "Me"
	}]
}

module.exports = {getNQuestions}