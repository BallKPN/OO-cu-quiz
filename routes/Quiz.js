const router = require("express").Router();
const quizController = require("../controllers/Quiz");
const { jwtValidate } = require("../middleware/jwt");

router.post("/", jwtValidate, quizController.createQuiz);

router.put("/:quiz_id", jwtValidate, quizController.updateQuiz);

router.delete("/:quiz_id", jwtValidate, quizController.deleteQuiz);

module.exports = router;
