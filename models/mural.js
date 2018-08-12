const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muralSchema = new Schema({
  title: { type: String, required: true },
  pImg1: { type: String, },
  pImg2: { type: String },
  mural: { type: String },
  playerId1: { type: String },
  playerName1:{ type: String, },
  playerPhoto1:{ type: String, },
  playerName2: { type: String },
  playerId2: { type: String },
  playerPhoto2: { type: String },
  date: { type: Date, default: Date.now },
  private: { type: Boolean }
});

const Mural = mongoose.model("Mural", muralSchema);

module.exports = Mural;