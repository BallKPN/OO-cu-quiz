const router = require("express").Router();
const quizController = require("../controllers/Quiz");

router.post("/add", quizController.addQuiz);

router.put("/update/:quiz_id", quizController.updateQuiz);

router.delete("/delete/:quiz_id", quizController.deleteQuiz);

module.exports = router;