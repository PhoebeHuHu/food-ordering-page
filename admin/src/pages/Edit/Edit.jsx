import React, { useEffect, useState } from 'react'
import './edit.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
const Edit = () => {
    const url = 'http://localhost:8080';
    const { foodId } = useParams(); // 获取路由参数中的 foodId
    const [image, setImage] = useState(false);
    const [imageOri, setImageOri] = useState('');
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    })
    // Fetch food data by ID
    useEffect(() => {
        if (foodId) {

            const fetchFoodData = async () => {
                try {
                    const response = await axios.get(`${url}/api/food/${foodId}`);
                    const { name, description, price, category, image } = response.data.food;

                    setData({
                        name,
                        description,
                        price: price.toString(),
                        category
                    });
                    setImageOri(`${url}/images/${image}`);
                } catch (error) {
                    console.error('Error fetching food data:', error);
                }
            };

            fetchFoodData();
        }
    }, [foodId, url]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    /*     const onImageChangeHandler = (event) => {
            const file = event.target.files[0];
            setImage(file);
        }; */

    const onSubmitHandler = async (event) => {
        //prevent reload page action after click submit btn
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        if (image) {
            formData.append('image', image);
        } else {
            formData.append('imageOri', imageOri); // 提交原始图像 URL
        }

        try {
            const response = await axios.put(`${url}/api/food/edit/${foodId}`, formData); // 发起 PUT 请求
            if (response.data.success) {
                toast.success(response.data.message); // 提示操作成功
                window.location.href = '/list'; // 页面跳转到指定路径
            } else {
                toast.error(response.data.message); // 提示操作失败
            }
        } catch (error) {
            console.error('Error editing food:', error); // 打印错误信息到控制台
            toast.error('Error editing food'); // 提示操作失败
        }
    }
    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Edit Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : imageOri} alt="product image" /> {/* 如果有新图像则显示新图像，否则显示origin图像 */}
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="image" hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" id="name" placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" id="description" rows='6' placeholder='Write content here'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" id="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Cake">Cake</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" id="price" placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>UPDATE</button>
            </form>
        </div>
    )
}

export default Edit