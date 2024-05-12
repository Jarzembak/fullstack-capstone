import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.sessionStorage.getItem("token")
            || localStorage.getItem("token")
            || null,
        cart: {
            cartId: 0,
            cartItems: []
        }
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            window.sessionStorage.setItem("token", action.payload);
            window.localStorage.setItem("token", action.payload);

        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearToken: (state) => {
            state.token = undefined;
            window.sessionStorage.removeItem("token");
            window.localStorage.removeItem("token");
            state.cart = undefined;
        }
    },
});

