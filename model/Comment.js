const { mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  commenter: {
    firstName: String,
    lastName: String,
  },
  commentDate: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
