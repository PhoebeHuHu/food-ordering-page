import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import NavbarItem from './NavbarItems'

const Navbar = () => {
    const [menu, setMenu] = useState('home');
    const NAV_ITEMS = [
        { label: 'home', key: 'home' },
        { label: 'menu', key: 'menu' },
        { label: 'mobile app', key: 'mobile-app' },
        { label: 'contact us', key: 'contact-us' }
    ]

    const [mobileMenu, setMobileMenu] = useState(false);
    const toggleMenu = () => {
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true)
    }

    return (
        <div className='navbar'>
            <img src={assets.menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
            <img src={assets.logo} alt="" className="logo" />
            <ul className={`navbar-menu ${mobileMenu ? '' : 'hide-mobile-menu'}`}>
                {NAV_ITEMS.map((item) => (
                    <NavbarItem key={item.key} label={item.label} isActive={menu === item.key} onClick={() => setMenu(item.key)} />
                ))}
            </ul>
            <div className='navbar-account'>
                <img src={assets.search_icon} alt="search bar icon" />
                <div className="navbar-basket">
                    <img src={assets.basket_icon} alt="basket icon" />
                    <div className="dot"></div>
                </div>
                <button>sign in</button>

            </div>
        </div>
    )
}

export default Navbar