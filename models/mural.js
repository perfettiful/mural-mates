const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muralSchema = new Schema({
  imgA: { type: String, required: true },
  imgB: { type: String },
  title: { type: String, required: true },
  playerA: { type: String },
  playerB: { type: String },
  date: { type: Date, default: Date.now }
});

const Mural = mongoose.model("Mural", muralSchema);

module.exports = Mural;