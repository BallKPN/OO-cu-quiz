const Answer = require("../model/Answer");
const User = require("../model/User");

const createAnswer = async (questionId, quizSetId, answerer, answer) => {
  const newAnswer = new Answer({
    questionId,
    quizSetId,
    answerer,
    answer,
  });
  await newAnswer.save();
};

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

exports.createAnswer = async (req, res) => {
  try {
    const { questionId, quizSetId, answer } = req.body;

    const username = req.user.username;
    const answerer = await User.findOne({ username }).exec()._id;

    await createAnswer(questionId, quizSetId, answerer, answer);

    res.json({
      msg: "เพิ่มคำตอบสำเร็จ",
    });
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการเพิ่มคำตอบ",
        },
      ],
    });
  }
};

//==============  คำนวณคะแนน ==============
const calculateScore = async (quizSetId, answerer) => {
  const answers = await Answer.find({ quizSetId, answerer }).populate("questionId").exec();
  answers.forEach(async (answer) => {
    let correctAnswer = answer.questionId.choices.find((choice) => choice.isCorrect);
    if (answer.answer === correctAnswer.choiceText || answer.answer === answer.questionId.textAnswer) {
      await Answer.updateOne({ _id: answer._id }, { score: answer.questionId.score }).exec();
    }
  });
  return;
};

exports.calculateScore = async (req, res) => {
  try {
    const quizSetId = req.params.quizSet_id;
    const username = req.user.username;
    const answerer = await User.findOne({ username }).exec()._id;

    await calculateScore(quizSetId, answerer);

    res.json({
      msg: "คำนวณคะแนนสำเร็จ",
    });
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการคำนวณคะแนน",
        },
      ],
    });
  }
};

//==============  แสดงคะแนน ==============
exports.getScore = async (req, res) => {
  try {
    const quizSetId = req.params.quizSet_id;
    const username = req.user.username;
    const answerer = await User.findOne({ username }).exec()._id;

    const answers = await Answer.find({ quizSetId, answerer }).exec();
    let totalScore = 0;
    answers.forEach((answer) => {
      totalScore += answer.score;
    });

    res.json({
      totalScore,
    });
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงคะแนน",
        },
      ],
    });
  }
};

exports.getScoreAll = async (req, res) => {
  try {
    const quizSetId = req.params.quizSet_id;
    const answers = await Answer.find({ quizSetId }).exec();
    let scoreList = [];
    answers.forEach((answer) => {
      scoreList.push(answer.score);
    });

    res.json({
      scoreList,
    });
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงคะแนน",
        },
      ],
    });
  }
};

//==============  ใช้ตรวจ ==============
exports.getAnswerByQuestion = async (req, res) => {
  try {
    const questionId = req.params.question_id;
    const answer = await Answer.find({ questionId }).populate("answerer").populate("comment").exec();

    res.json(answer); 
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงคำตอบ",
        },
      ],
    });
  }
};

exports.getAnswerByUser = async (req, res) => {
  try {
    const username = req.params.username;
    const answerer = await User.findOne({ username }).exec()._id;
    const answer = await Answer.find({ answerer }).populate("questionId").populate("comment").exec();

    res.json(answer);
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงคำตอบ",
        },
      ],
    });
  }
};