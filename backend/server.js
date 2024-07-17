import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"//使用 .env 文件来管理环境变量
import cartRouter from "./routes/cartRoute.js";

//app config
const app = express();
const port = 8080;

//middleware
app.use(express.json());//whenere get the reques from the front end to backend, will be passed using this json
app.use(cors());//using this we can access the backend from any frontend

// db connection
connectDB();

//api endpoint:为 Express 应用程序设置一个 API 端点，并将所有以 /api/food 开头的请求路由到 foodRouter 上进行处理
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);

//使得 uploads 目录下的静态文件可以通过 /images 路径来访问。当客户端请求路径以 /images 开头时，Express 将查找 uploads 目录中的对应文件并返回。
app.use('/images', express.static('uploads'));

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://pekihu97:dJCuQ7h01hgfwPQ6@phoebehu.uq4duck.mongodb.net/?  FoodDel