let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date
})
module.exports = mongoose.model('User', userSchema)