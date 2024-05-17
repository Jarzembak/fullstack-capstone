import React, { useState } from 'react';
import './style.css';
import { useAuthenticateUserMutation, useCreateUserMutation } from '../../services/user';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
    const [inputValues, setInputValues] = useState({});
    const navigate = useNavigate();
    const handleFieldChange = ({ target }) => {
        setInputValues({ ...inputValues, [target.name]: target.value })
    }
    const [createUser, { isLoading }] = useCreateUserMutation();
    const [login] = useAuthenticateUserMutation();

    if (isLoading) {

    } else {
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(inputValues).unwrap().then(async (success) => {
            const { data: auth } = await login({ username: inputValues.username, password: inputValues.password })
            setToken(auth)
            navigate("/")
        });
    };

    return (

        <form onSubmit={handleSubmit} method='POST' id="RegisterUser">
            <h2>Register</h2>
            <label><span>First Name</span><input name="firstName" onChange={handleFieldChange} /></label>
            <label><span>Last Name</span><input name="lastName" onChange={handleFieldChange} /></label>
            <label><span>Username</span><input name="username" onChange={handleFieldChange} required /></label>
            <label><span>Password</span><input name="password" onChange={handleFieldChange} type="password" required /></label>
            <label><span>Verify Password</span><input name="password2" onChange={handleFieldChange} type="password" /></label>
            <label><span>E-Mail</span><input name="email" onChange={handleFieldChange} required /></label>
            <label><span>Street Address</span><input name="streetAddress" onChange={handleFieldChange} /></label>
            <label><span>City</span><input name="city" onChange={handleFieldChange} /></label>
            <label><span>Zip Code</span><input name="zipCode" onChange={handleFieldChange} /></label>
            <input type='submit' value="Register"></input>
        </form>
    );
};

export default Register;
