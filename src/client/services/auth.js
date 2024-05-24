import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.localStorage.getItem("token")
            || null,
        cart: {
            cartItems: []
        },
        user: window.localStorage.getItem("userDetails") ? JSON.parse(atob(window.localStorage.getItem("userDetails"))) :
            {
                isAdmin: undefined
            }
    },
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload.token;
            state.user = payload.user;
            state.cart = {
                cartItems: []
            }

            window.localStorage.setItem("token", payload.token);
            window.localStorage.setItem("userDetails", btoa(JSON.stringify(payload.user)));

        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearToken: (state) => {
            window.localStorage.clear();
            window.location.href = "/"
        }
    },
});

