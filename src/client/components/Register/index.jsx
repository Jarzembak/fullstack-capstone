import React, { useState } from 'react';
import './style.css';

const Register = () => {
    const [inputValues, setInputValues] = useState({});
    const handleFieldChange = ({ target }) => {
        setInputValues({ ...inputValues, [target.name]: target.value })
    }

    const register = async () => {
        try {
            console.log("Submitted Form Data", inputValues)
            // const response = await fetch('http://localhost:3000/api/users/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email,
            //         password,
            //     })
            // });
            // const result = await response.json();
            // setMessage(result.message);
            // if (!response.ok) {
            //     throw (result)
            // }
            // setEmail('');
            // setPassword('');
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register();
    };

    return (
        
            <form onSubmit={handleSubmit} id="RegisterUser">
                <h2>Register</h2>
                <label><span>First Name</span><input name="firstName" onChange={handleFieldChange} /></label>
                <label><span>Last Name</span><input name="lastName" onChange={handleFieldChange} /></label>
                <label><span>Username</span><input name="username" onChange={handleFieldChange} /></label>
                <label><span>Password</span><input name="password" onChange={handleFieldChange} type="password" /></label>
                <label><span>Verify Password</span><input name="password2" onChange={handleFieldChange} type="password" /></label>
                <label><span>E-Mail</span><input name="email" onChange={handleFieldChange} /></label>
                <label><span>Street Address</span><input name="streetAddress" onChange={handleFieldChange} /></label>
                <label><span>City</span><input name="city" onChange={handleFieldChange} /></label>
                <label><span>Zip Code</span><input name="zipCode" onChange={handleFieldChange} /></label>
                <input type='submit' value="Register"></input>
            </form>
    );
};

export default Register;
