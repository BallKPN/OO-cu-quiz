const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String, // Consider using bcrypt for hashing
  quizSets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizSet",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
