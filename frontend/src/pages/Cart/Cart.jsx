import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
const Cart = () => {

    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
    const CART_ITEMS = [
        { title: 'Items' }
    ]
    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <>
                                <div className='cart-items-title cart-items-item' key={index}>
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <img src={assets.cross_icon} alt="remove icon" className="remove-icon" onClick={() => removeFromCart(item._id)} />
                                </div>

                                <hr />
                            </>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Cart