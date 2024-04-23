const router = require("express").Router();
const quizSetController = require("../controllers/QuizSet");
const { jwtValidate } = require("../middleware/jwt");

router.post("/", jwtValidate, quizSetController.createQuizSet);

router.put("/:quizSet_id", jwtValidate, quizSetController.updateQuizSet);

router.delete("/:quizSet_id", jwtValidate, quizSetController.deleteQuizSet);

router.get("/", jwtValidate, quizSetController.getQuizSets); //ดึง QuizSet ทั้งหมด
router.get("/id/:quizSet_id", jwtValidate, quizSetController.getQuizSet); //ดึง QuizSet ตาม ID && ใช้ตอนกดเข้าทำแบบทดสอบ
router.get("/user", jwtValidate, quizSetController.getOwnQuizSets); //ดึง QuizSet ที่ User สร้าง

module.exports = router;