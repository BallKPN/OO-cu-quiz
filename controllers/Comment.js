const Comment = require("../model/Comment");

exports.createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const commenter = req.user.name;
    const newComment = new Comment({
      comment,
      commenter,
    });
    await newComment.save();
    res.json({
      msg: "เพิ่มความคิดเห็นสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น",
        },
      ],
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const _id = req.params.comment_id;
    const { comment } = req.body;
    await Comment.updateOne({ _id }, { comment }).exec();
    res.json({
      msg: "อัพเดทความคิดเห็นสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการอัพเดทความคิดเห็น",
        },
      ],
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const _id = req.params.comment_id;
    await Comment.deleteOne({ _id }).exec();
    res.json({
      msg: "ลบความคิดเห็นสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการลบความคิดเห็น",
        },
      ],
    });
  }
};