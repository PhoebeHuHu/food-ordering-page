import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

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

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    }

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
                        <div className={getTotalCartAmount() > 0 ? 'dot' : ''}></div>
                    </div>
                    {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt='profile' />
                        <ul className='nav-profile-dropdown'>
                            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}


                </div>
            </div>

        </div>
    )
}

export default Navbar