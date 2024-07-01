import foodModel from "../models/foodModel.js";
import fs from 'fs';//import file system prebuilt in nodeJS

//add food item

const addFood = async (req, res) => {
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
export { addFood, listFood, removeFood };