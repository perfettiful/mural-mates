const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muralSchema = new Schema({
  pImg1: { type: String, },
  pImg2: { type: String },
  mural: { type: String },
  title: { type: String, required: true },
  playerA: { type: String },
  playerB: { type: String },
  date: { type: Date, default: Date.now },
  private: { type: Boolean }
});

const Mural = mongoose.model("Mural", muralSchema);

module.exports = Mural;