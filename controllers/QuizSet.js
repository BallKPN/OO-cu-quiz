const QuizSet = require("../model/QuizSet");

exports.createQuizSet = async (req, res) => {
  try {
    const { title, endDate, quizzes } = req.body;
    const newQuizSet = new QuizSet({
      title,
      createdBy,
      endDate,
      quizzes,
    });
    await newQuizSet.save();
    res.json({
      msg: "เพิ่มชุดคำถามสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการเพิ่มชุดคำถาม",
        },
      ],
    });
  }
};

exports.updateQuizSet = async (req, res) => {
  try {
    const { id, title, endDate, quizzes } = req.body;
    await QuizSet.updateOne({ id }, { title, endDate, quizzes }).exec();
    res.json({
      msg: "อัพเดทชุดคำถามสำเร็จ",
    });
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการอัพเดทชุดคำถาม",
        },
      ],
    });
  }
};

exports.deleteQuizSet = async (req, res) => {
  try {
    const id = req.query.quizSet_id;
    await QuizSet.deleteOne({ id }).exec();
    res.json({
      msg: "ลบชุดคำถามสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการลบชุดคำถาม",
        },
      ],
    });
  }
};

exports.getQuizSet = async (req, res) => {
  try {
    const id = req.query.quizSet_id;
    const quizSet = await QuizSet.findOne({ id }).exec();
    res.json(quizSet);
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงข้อมูลชุดคำถาม",
        },
      ],
    });
  }
};