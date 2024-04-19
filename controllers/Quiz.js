const Quiz = require("../model/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    const { title, createdBy, questions } = req.body;
    const newQuiz = new Quiz({
      title,
      createdBy,
      questions,
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
    const id = req.params.quiz_id;
    const { title, questions } = req.body;
    await Quiz.updateOne({ id }, { title, questions }).exec();
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
    const id = req.params.quiz_id;
    await Quiz.deleteOne({ id }).exec();
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
