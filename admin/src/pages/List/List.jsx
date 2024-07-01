import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
const List = () => {
    const url = 'http://localhost:8080'

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response.data)
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error('Error');
        }
    }

    const removeFood = async (foodId) => {
        console.log(foodId);
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error('Error');
        }
    }
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div className="list-table-format" key={index}>
                            <img src={`${url}/images/` + item.image} alt="food image" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <img onClick={() => removeFood(item._id)} src={assets.cross_icon} alt="remove item icon" className='cursor' />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List