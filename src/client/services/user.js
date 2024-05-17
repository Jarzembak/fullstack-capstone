import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
        }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({ url: "users/all" }),
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: `users/`, method: "POST", body
            }),
        }),
        getUserCurrentCart: builder.query({
            query: () => ({ url: `users/cart` }),
        }),
        getUserCurrentCartDetails: builder.query({
            query: () => ({ url: `users/cart/details` }),
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `users/`, method: "PUT", body
            }),
        }),
        getUserHistory: builder.query({
            query: () => ({ url: `users/history` }),
        }),
        authenticateUser: builder.mutation({
            query: (body) => ({
                url: `users/login`, method: "POST", body
            }),
        }),
    }),
});

export const { useGetUsersQuery, useCreateUserMutation, useGetUserHistoryQuery, useGetUserCurrentCartQuery, useGetUserCurrentCartDetailsQuery, useAuthenticateUserMutation } = userApi;
