const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muralSchema = new Schema({
  imga: { type: String, },
  imgb: { type: String },
  mural: { type: String },
  title: { type: String, required: true },
  playera: { type: String },
  playerb: { type: String },
  date: { type: Date, default: Date.now }
});

const Mural = mongoose.model("Mural", muralSchema);

module.exports = Mural;