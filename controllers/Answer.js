const Answer = require("../model/Answer");
const User = require("../model/User");

exports.createAnswerSet = async (req, res) => {
  try {
    const { questionIds, quizSetId, answer } = req.body;

    const username = req.user.username;
    const answerer = await User.findOne({ username }).exec()._id;

    for (let i = 0; i < questionIds.length; i++) {
      await createAnswer(questionIds[i], quizSetId, answerer, answer[i]);
    }

    res.json({
      msg: "เพิ่มคำตอบสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการเพิ่มคำตอบ",
        },
      ],
    });
  }
};

const createAnswer = async (questionId, quizSetId, answerer, answer) => {
  const newAnswer = new Answer({
    questionId,
    quizSetId,
    answerer,
    answer,
  });
  await newAnswer.save();
};
