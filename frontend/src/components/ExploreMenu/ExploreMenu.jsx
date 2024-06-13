import React from 'react'
import './exploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, veritatis perspiciatis. Voluptas veniam doloremque dolorem earum. Earum sint recusandae porro saepe alias </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    /* 该函数接收当前状态值作为参数，并返回一个新的状态值： */
                    <div className="menu-list-item" key={index} onClick={() => setCategory(prevCategory => prevCategory === item.menu_name ? 'All' : item.menu_name)}>
                        <img src={item.menu_image} alt="" className={category === item.menu_name ? 'active-img' : ''} />
                        <p className={category === item.menu_name ? 'active-p' : ''}>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu