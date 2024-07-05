import foodModel from "../models/foodModel.js";
import fs from 'fs';//import file system prebuilt in nodeJS

//add food item

const addFood = async (req, res) => {
    //create a variable to store the filename of the image
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
};

//Get food by id
const getFoodById = async (req, res) => {
    const foodId = req.params.id;

    try {
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        res.json({ success: true, food });
    } catch (error) {
        console.error("Error fetching food:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// edit food item
const editFood = async (req, res) => {
    console.log("Received request to edit food"); // 添加日志
    const foodId = req.params._id;
    console.log("Food ID:", foodId); // 添加日志


    // 初始化图片文件名，如果有上传新的图片文件，将文件名赋值给image_filename
    let image_filename;
    if (req.file) {
        image_filename = `${req.file.filename}`;
        console.log("Uploaded file:", image_filename); // 添加日志
    }

    // 创建一个对象来存储需要更新的数据
    const updatedData = {};
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.description) updatedData.description = req.body.description;
    if (req.body.price) updatedData.price = req.body.price;
    if (req.body.category) updatedData.category = req.body.category;
    if (image_filename) updatedData.image = image_filename;

    try {
        const food = await foodModel.findByIdAndUpdate(foodId, updatedData, { new: true });
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        res.json({ success: true, message: "Food Updated", food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const foodToRemove = await foodModel.findById(req.body.id);
        //delete the image in uploads
        fs.unlink(`uploads/${foodToRemove.image}`, () => { });
        //delete the food item from database(mongoose)
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
// food items list api
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}



export { addFood, listFood, removeFood, editFood, getFoodById };
