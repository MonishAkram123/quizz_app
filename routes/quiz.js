const router = require('express').Router();

// TODO: load subjects and render it on quiz_home page
router.get("/", (req, res) => {
	res.render("quiz_home")
})

module.exports = router