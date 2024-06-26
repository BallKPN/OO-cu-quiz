const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

if (process.env.NODE_ENV !== "production") {
    console.log("development");
    require("dotenv").config();
  }

mongoose.connect(process.env.MONGO_URL);

//cors
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(helmet());
app.use(mongoSanitize());

//Routes
app.use("/user", require("./routes/User"));
app.use("/comment", require("./routes/Comment"));
app.use("/answer", require("./routes/Answer"));
app.use("/quiz", require("./routes/Quiz"));
app.use("/quizset", require("./routes/QuizSet"));

//Server
http.createServer(app).listen(process.env.PORT, function () {
    console.log(
      "Your server is listening on port %d (http://localhost:%d)",
      process.env.PORT,
      process.env.PORT
    );
  });