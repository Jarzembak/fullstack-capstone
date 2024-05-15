import React, { useEffect, useState } from 'react';
import './style.css';
import { useAuthenticateUserMutation } from '../../services/user';
import { useNavigate } from 'react-router-dom';


const Login = ({ setToken }) => {
  const [inputValues, setInputValues] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFieldChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value })
  }

  const [login, { reset }] = useAuthenticateUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputValues).unwrap().then((success) => {
      setToken(success);
      navigate("/")
    }, (error) => {
      setErrorMessage(error.data);
      reset();
    });
  };



  return (

    <form id="Login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>{errorMessage}</div>
      <label><span>Username</span><input name="username" onChange={handleFieldChange} /></label>
      <label><span>Password</span><input name="password" onChange={handleFieldChange} /></label>
      <input type='submit' value="Login"></input>
    </form>

  );
};

export default Login;
