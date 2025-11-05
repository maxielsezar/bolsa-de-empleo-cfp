const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  tel:{ type: String, required: true },
  password:{ type: String, required: true },
}, { timestamps: true });

module.exports = model('User', userSchema);


{isLogin && <h1>se guardo el usuario</h1>}