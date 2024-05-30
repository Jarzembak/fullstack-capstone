import React, { useState } from 'react';
import './style.css';
import { useAuthenticateUserMutation, useCreateUserMutation } from '../../services/user';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
    const [inputValues, setInputValues] = useState({});
    const [errMessage, setErrorMessage] = useState("");
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
        }, async ({ data }) => {
            const parser = new DOMParser();
            const error = parser.parseFromString(data, "text/html").body.innerText;
            if (error.includes("Unique constraint failed on the fields: (`username`)")) {
                setErrorMessage(`Username '${inputValues.username}' is already in use.`)
            }
        });
    };

    return (

        <form onSubmit={handleSubmit} method='POST' id="RegisterUser">
            <h2>Register</h2>
            <h3>{errMessage}</h3>
            <label><span>First Name</span><input autoComplete='off' name="firstName" onChange={handleFieldChange} /></label>
            <label><span>Last Name</span><input autoComplete='off' name="lastName" onChange={handleFieldChange} /></label>
            <label><span>Username</span><input autoComplete='off' name="username" onChange={handleFieldChange} required /></label>
            <label><span>Password</span><input autoComplete='off' name="password" onChange={handleFieldChange} type="password" required /></label>
            <label><span>Verify Password</span><input autoComplete='off' name="password2" onChange={handleFieldChange} type="password" /></label>
            <label><span>E-Mail</span><input autoComplete='off' name="email" onChange={handleFieldChange} required /></label>
            <label><span>Street Address</span><input autoComplete='off' name="streetAddress" onChange={handleFieldChange} /></label>
            <label><span>City</span><input autoComplete='off' name="city" onChange={handleFieldChange} /></label>
            <label><span>Zip Code</span><input autoComplete='off' name="zipCode" onChange={handleFieldChange} /></label>
            <input type='submit' value="Register"></input>
        </form>
    );
};

export default Register;
