import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

//app config
const app = express();
const port = 8080;

//middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

//api endpoint
app.use('/api/food', foodRouter);
//使得 uploads 目录下的静态文件可以通过 /images 路径来访问。当客户端请求路径以 /images 开头时，Express 将查找 uploads 目录中的对应文件并返回。
app.use('/images', express.static('uploads'))

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://pekihu97:dJCuQ7h01hgfwPQ6@phoebehu.uq4duck.mongodb.net/?  FoodDel