const router = require("express").Router();
const answerController = require("../controllers/Answer");
const jwtValidate = require("../middleware/jwt");

//อันบนคือถ้ากดข้อนึงแล้วบันทึกข้อมูลเก็บไว้ หรือ ถ้าจะทำแบบส่งทุกข้อพร้อมกันใช้อันล่าง
router.post("/", jwtValidate, answerController.createAnswer);
router.post("/all", jwtValidate, answerController.createAnswerSet);

//ไว้คำนวณคะแนนตอน Submit
router.put("/calculate/:quizSet_id", jwtValidate, answerController.calculateScore);

router.get("/:quizSet_id", jwtValidate, answerController.getScoreAll); //ใช้ตอน ผู้สร้าง กดเข้าดูคะแนนของทุกคน
router.get("/self/:quizSet_id", jwtValidate, answerController.getScore); //ใช้ตอน User กดเข้าดูคะแนนของตัวเอง
router.get("/user/:username", jwtValidate, answerController.getAnswerByUser); //ใช้ตอน User กดเข้าดูคำตอบของตัวเอง หรือ ผู้สร้าง กดเข้าดูคำตอบของ User คนอื่น
router.get("/question/:question_id", jwtValidate, answerController.getAnswerByQuestion); //ใช้ตอน ผู้สร้าง กดเข้าดูคำตอบของคำถามนั้นๆ ที่ทุกคนตอบ

module.exports = router;