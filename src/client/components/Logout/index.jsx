import React, { useEffect } from 'react';
import './style.css';
import { authSlice } from "../../services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authSlice.actions.clearToken())
  }, [])


  setTimeout(() => {
    navigate("/");
  }, 3000)

  return (
    <>
      You've successfully logged off. thank you
    </>
  );
};

export default Logout;
