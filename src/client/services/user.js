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
            query: () => ({ url: "users/" }),
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: `users/`, method: "POST", body
            }),
        }),
        getUserCurrentCart: builder.query({
            query: () => ({ url: `users/cart` }),
        }),
        updateUser: builder.mutation({
            query: (body, userId) => ({
                url: `users/${userId}`, method: "PUT", body
            }),
        }),
        getUserHistory: builder.query({
            query: (userId) => ({ url: `users/${userId}/history` }),
        }),
        authenticateUser: builder.mutation({
            query: (body) => ({
                url: `users/login`, method: "POST", body
            }),
        }),
    }),
});

export const { useGetUsersQuery, useCreateUserMutation, useGetUserHistoryQuery, useGetUserCurrentCartQuery, useAuthenticateUserMutation } = userApi;
