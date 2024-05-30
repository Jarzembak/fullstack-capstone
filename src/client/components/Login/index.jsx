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
    setErrorMessage("")
    login(inputValues).unwrap().then((success) => {
      setToken(success);
      navigate("/")
    }, (error) => {
      setErrorMessage("Invalid Login. Please try again");
      reset();
    });
  };

  const handleRegisterClick = () => {
    navigate("/Register");
  }

  return (

    <form id="Login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>{errorMessage}</div>
      <label><span>Username</span><input name="username" onChange={handleFieldChange} /></label>
      <label><span>Password</span><input name="password" onChange={handleFieldChange} /></label>
      <input className="button" type='submit' value="Login"></input>
      <button className="button" onClick={handleRegisterClick}>Register</button>
    </form>

  );
};

export default Login;
