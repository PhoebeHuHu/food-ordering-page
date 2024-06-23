import mongoose from "mongoose";

export const connectDB = async () => {
    (await mongoose.connect('mongodb+srv://pekihu97:dJCuQ7h01hgfwPQ6@phoebehu.uq4duck.mongodb.net/food-del').then(() => console.log("DB Connected")))
}