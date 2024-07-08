import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false })//if we don't add minimize:false,the data will not be created besause wo have not provided any data at cartData
/* 在Mongoose中，minimize是一个Schema选项，用来控制在保存文档到MongoDB时，是否移除空的对象。具体来说，如果一个文档中的某个嵌套对象（或嵌套数组中的对象）是空的，并且minimize选项被设置为true，那么在保存文档时，这个空对象将会被移除。

默认情况下，minimize选项是true。 */

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
//if the model is already created, then the model will be used, if the model is not created, it will create the user model

export default userModel;