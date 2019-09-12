const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function() {
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
});

module.exports = mongoose.model('User', UserSchema);
