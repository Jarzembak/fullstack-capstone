import React, { useEffect } from 'react';
import { authSlice } from "../../services/auth";
import { useDispatch } from "react-redux";


const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSlice.actions.clearToken())
  }, [])

};

export default Logout;
