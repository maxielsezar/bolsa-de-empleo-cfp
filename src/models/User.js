const { Schema, model, Types } = require('mongoose');
const { appconfiguraciones } = require('../configuraciones');


const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  tel:{ type: String, required: true },
  password:{ type: String, required: true },
}, { timestamps: true });

productSchema.methods.setImgUrl= function setImgUrl (filename) {
   const { host, port } =appconfiguraciones
   this.ImgUrl = '${host}:${port}/public/${filename}'
}

module.exports = model('User', userSchema);
