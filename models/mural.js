const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muralSchema = new Schema({
  title: { type: String, required: true },
  pImg1: { type: String, },
  pImg2: { type: String },
  mural: { type: String },
  //p1seen is used for notification purposes
  //It's initially set to true and toggled to false when player2 submits the second drawing
  p1seen: { type: Boolean, default: true },
  //ID Requires user to be logged in via auth0 to get this value
  //This probably isn't super secure, but it will do the job (preventing non-logged in users from submitting)
  playerId1: { type: String, required: true },
  playerName1: { type: String, },
  playerPhoto1: { type: String, },
  playerName2: { type: String },
  playerId2: { type: String, require: true },
  playerPhoto2: { type: String },
  date: { type: Date, default: Date.now },
  private: { type: Boolean }
});

const Mural = mongoose.model("Mural", muralSchema);

module.exports = Mural;