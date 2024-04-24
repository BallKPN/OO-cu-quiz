const QuizSet = require("../model/QuizSet");
const User = require("../model/User");
const Answer = require("../model/Answer");
const { createQuizs } = require("./Quiz");

exports.createQuizSet = async (req, res) => {
  try {
    const { title, description, endDate, quizzes } = req.body;
    const createdBy = req.user.username;

    //Create quizzes
    const quizIds = await createQuizs(quizzes);

    const newQuizSet = new QuizSet({
      title,
      createdBy,
      endDate,
      quizzes: quizIds,
      description,
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
    const _id = req.params.quizSet_id;
    const { title, description, endDate, quizzes } = req.body;
    await QuizSet.updateOne(
      { _id },
      { title, description, endDate, quizzes }
    ).exec();
    res.json({
      msg: "อัพเดทชุดคำถามสำเร็จ",
    });
  } catch (error) {
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
    const _id = req.params.quizSet_id;
    await QuizSet.deleteOne({ _id }).exec();
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

exports.getQuizSets = async (req, res) => {
  try {
    const quizSets = await QuizSet.find({}).exec();
    res.json(quizSets);
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงข้อมูลชุดคำถาม",
        },
      ],
    });
  }
};

exports.getQuizSet = async (req, res) => {
  try {
    const _id = req.params.quizSet_id;
    const quizSet = await QuizSet.findOne({ _id }).populate("quizzes").exec();
    res.json(quizSet);
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงข้อมูลชุดคำถาม",
        },
      ],
    });
  }
};

exports.getOwnQuizSets = async (req, res) => {
  try {
    const createdBy = req.user.username;
    const quizSets = await QuizSet.find({ createdBy }).exec();
    res.json(quizSets);
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงข้อมูลชุดคำถาม",
        },
      ],
    });
  }
};

exports.getSubmittedQuizSets = async (req, res) => {
  try {
    const username = req.user.username;
    const user_id = await User.findOne({ username }).exec();
    const answerer = user_id._id;

    const quizSets = await Answer.find({ answerer }).populate("quizSet").exec();

    res.json(quizSets.map((answer) => answer.quizSet));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงข้อมูลชุดคำถาม",
        },
      ],
    });
  }
};
