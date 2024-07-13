import React, { useContext, useEffect, useState } from 'react'
import './loginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState('Login');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(userData => ({ ...userData, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl, userData)

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }
    }
    useEffect(() => {
        console.log(userData)
    }, [userData])
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Login' ? <></> : <input name='name' type="text" placeholder='Your name' required onChange={onChangeHandler} value={userData.name} />}
                    <input name='email' type="email" placeholder='Your email' required onChange={onChangeHandler} value={userData.email} />
                    <input name='password' type="password" placeholder='Password' required onChange={onChangeHandler} value={userData.password} />
                </div>

                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === 'Login'
                    ? <p>Create a new account?<span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account?<span onClick={() => setCurrState('Login')}>Login here</span></p>
                }


            </form>
        </div>
    )
}

export default LoginPopup