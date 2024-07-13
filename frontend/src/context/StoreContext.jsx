/* React 的 Context API，它用于在组件树中传递数据，而不需要手动通过每一层组件进行传递。 */

import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:8080';
    const [token, setToken] = useState("");


    const addToCart = (itemId) => {
        // user add this item first time
        if (!cartItems[itemId]) {
            //新增key：value
            setCartItems(prevCartData => ({ ...prevCartData, [itemId]: 1 }))
        }
        //if the itemId already exist
        else {
            //update the quantity value of this itemId
            setCartItems(prevCartData => ({ ...prevCartData, [itemId]: prevCartData[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        //update the quantity value of this itemId, minus 1
        setCartItems((prevCartData => ({ ...prevCartData, [itemId]: prevCartData[itemId] - 1 })))
    }

    const getTotalCartAmount = () => {
        let totalAmout = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmout += itemInfo.price * cartItems[item];
            }

        }
        return totalAmout;
    }
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])//输出cartItems在它每次有变化的时候

    //local storage data will be saved in the token state when refresh the page
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

/* 
cartItems 是一个对象，表示购物车中的项目及其数量。其结构将为：
{
    itemId1: quantity1,
    itemId2: quantity2,
    ...
}
 */

/* 
-为什么这里需要用bracket notation访问对象属性
访问对象属性有两种方式：使用点符号（dot notation）和使用方括号（bracket notation）
使用点符号时，属性名必须是一个合法的标识符，并且是一个固定的字符串
使用方括号时，属性名可以是一个变量或字符串表达式
在这段代码中，itemId 是一个变量，表示项目的唯一标识符。因此，应该使用方括号来动态地访问 cartItems 对象的属性
*/

/* 
useEffect 的基本用法
useEffect 是一个函数，它接受两个参数：

一个副作用函数：这是 useEffect 在组件渲染后要执行的代码。
一个依赖项数组：这是一个数组，包含当其值发生变化时需要重新运行副作用函数的变量。
*/