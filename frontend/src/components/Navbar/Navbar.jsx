import React, { useEffect, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('home');
    const NAV_ITEMS = [
        { label: 'home', key: 'home', href: '/' },
        { label: 'menu', key: 'menu', href: '#explore-menu' },
        { label: 'mobile app', key: 'mobile-app', href: '#app-download' },
        { label: 'contact us', key: 'contact-us', href: '#footer' }
    ];

    const [mobileMenu, setMobileMenu] = useState(false);
    const toggleMenu = () => {
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true)
    }
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        })
    }, [])

    return (
        <div className={`navbar ${sticky ? 'nav-bg' : ''}`}>
            <div className='container'>
                <img src={assets.menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
                <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
                <ul className={`navbar-menu ${mobileMenu ? '' : 'hide-mobile-menu'}`}>
                    {NAV_ITEMS.map(item => (
                        item.key === 'home' ? (
                            <Link
                                key={item.key}
                                to={item.href}
                                onClick={() => { setMenu(item.key); window.scrollTo({ top: 0 }) }}
                                className={menu === item.key ? 'active' : ''}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <a
                                key={item.key}
                                href={item.href}
                                onClick={() => setMenu(item.key)}
                                className={menu === item.key ? 'active' : ''}
                            >
                                {item.label}
                            </a>
                        )
                    ))}
                </ul>
                <div className='navbar-account'>
                    <img src={assets.search_icon} alt="search bar icon" />
                    <div className="navbar-basket">
                        <Link to='/cart'><img src={assets.basket_icon} alt="basket icon" /></Link>
                        <div className="dot"></div>
                    </div>
                    <button onClick={() => setShowLogin(true)}>sign in</button>

                </div>
            </div>

        </div>
    )
}

export default Navbar