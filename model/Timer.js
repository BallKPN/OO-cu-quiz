const { mongoose } = require("mongoose");

const timerSchema = new mongoose.Schema({
    duration: { type: Number, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
});

const Timer = mongoose.model("Timer", timerSchema);

module.exports = Timer;