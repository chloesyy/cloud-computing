import React, { useState } from "react";
import loginImg from "./images/login.png";

export default function Login(props) {
    const [userid, setUserID] = useState('');
    const [pass, setPass] = useState('');

    console.log(userid, pass)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userid);
    }

    return (
        <div className="auth-form-container">
            <div className="login-details">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="userid">User ID:</label>
                    <input value={userid} onChange={(e) => setUserID(e.target.value)} type="userid" placeholder="User ID" id="userid" name="userid" />
                    <label htmlFor="password">Password:</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <button type="submit" className="submit-btn">Log In</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? <span>Register here.</span></button>
            </div>
            <img src={loginImg} alt="login" className="login--image" />
        </div>
    )
}