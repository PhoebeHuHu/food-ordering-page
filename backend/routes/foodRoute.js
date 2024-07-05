import express from 'express';
import { addFood, listFood, removeFood, editFood, getFoodById } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();
//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);//post创建资源或提交数据进行处理
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood)
foodRouter.get("/:id", getFoodById);
foodRouter.put("/edit/:_id", upload.single("image"), editFood)//PUT方法通常用于更新资源
export default foodRouter;
