import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.localStorage.getItem("token")
            || null,
        cart: {
            cartItems: []
        },
        user: null
    },
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload.token;
            state.user = payload.user;
            state.cart = {
                cartItems: []
            }
            window.localStorage.setItem("token", payload.token);

        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearToken: (state) => {
            window.localStorage.removeItem("token");
            window.location.href = "/"
        }
    },
});

