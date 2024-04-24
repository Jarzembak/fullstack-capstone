import React, { useState } from 'react';
import './style.css';


const Login = () => {
  const [message, setMessage] = useState('');
  const [inputValues, setInputValues] = useState({});
  const handleFieldChange = ({ target }) => {
      setInputValues({ ...inputValues, [target.name]: target.value })
  }

  const login = async () => {
    try {
      console.log("Submitted Form Data", inputValues)

    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <form id="Login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label><span>Username</span><input name="username" onChange={handleFieldChange}/></label>
      <label><span>Password</span><input name="password" onChange={handleFieldChange}/></label>
      <input type='submit' value="Login"></input>
    </form>
  );
};

export default Login;
