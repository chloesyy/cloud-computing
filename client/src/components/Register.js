import React, { useState } from "react";
import RegisterImg from "./images/register.png";

export default function Register(props) {
    const [userid, setUserID] = useState('');
    const [pass, setPass] = useState('');

    console.log(userid, pass)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userid);
    }

    return (
        <div className="auth-form-container">
            <div className="register-details">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="userid">User ID:</label>
                    <input value={userid} onChange={(e) => setUserID(e.target.value)} placeholder="User ID" id="userid" name="userid"/>
                    <label htmlFor="password">Password:</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="Password" placeholder="********" id="password" name="password" />
                    <button type="submit" className="submit-btn">Register</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? <span>Login here.</span></button>
            </div>
            <img src={RegisterImg} alt="register" className="register--image" />
        </div>
    )
}