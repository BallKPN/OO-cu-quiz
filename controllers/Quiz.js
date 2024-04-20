const Quiz = require("../model/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    const { title, choices, textAnswer, score } = req.body;
    const newQuiz = new Quiz({
      title,
      choices,
      textAnswer,
      score,
    });
    await newQuiz.save();
    res.json({
      msg: "เพิ่มคำถามสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการเพิ่มคำถาม",
        },
      ],
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const _id = req.params.quiz_id;
    const { title, choices, score } = req.body;
    await Quiz.updateOne({ _id }, { title, choices, textAnswer, score }).exec();
    res.json({
      msg: "อัพเดทคำถามสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการอัพเดทคำถาม",
        },
      ],
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const _id = req.params.quiz_id;
    await Quiz.deleteOne({ _id }).exec();
    res.json({
      msg: "ลบคำถามสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการลบคำถาม",
        },
      ],
    });
  }
};
