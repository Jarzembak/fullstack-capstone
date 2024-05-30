import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/", prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
        }
    }
    ),
    entityTypes: ["Cart"],
    endpoints: (builder) => ({
        getAllCarts: builder.query({
            query: () => ({ url: "carts/" }),
        }),
        getCart: builder.query({
            query: (cartId) => ({ url: `carts/${cartId}` }),
        }),
        getCartItems: builder.query({
            query: (cartId) => ({ url: `carts/${cartId}/all-items` }),

        }),
        getCartItemsProducts: builder.query({
            query: (cartId) => ({ url: `carts/${cartId}/all-items-and-products` }),
        }),
        createCart: builder.mutation({
            query: (body) => ({
                url: `carts/`, method: "POST", body
            }),
            invalidatesTags: ["Cart"]
        }),
        updateCartStatus: builder.mutation({
            query: (body) => ({
                url: `carts/${body.cartId}`, method: "PUT", body
            }),
        }),
        createCartItem: builder.mutation({
            query: (body) => ({
                url: `carts/item`, method: "POST", body
            }),
        }),
        updateCartItem: builder.mutation({
            query: (body) => ({
                url: `carts/item`, method: "PUT", body
            }),
        }),
        destroyCartItem: builder.mutation({
            query: (body) => ({
                url: `carts/item`, method: "DELETE", body
            }),
        }),
        destroyAllCartItems: builder.mutation({
            query: (body, cartId) => ({
                url: `carts/item/${cartId}`, method: "DELETE"
            }),
        }),
    }),
});


export const {
    useGetAllCartsQuery,
    useGetCartQuery,
    useGetCartItemsQuery,
    useGetCartItemsProductsQuery,
    useCreateCartMutation,
    useCreateCartItemMutation,
    useUpdateCartStatusMutation,
    useUpdateCartItemMutation,
    useDestroyCartItemMutation,
    useDestroyAllCartItemsMutation,

} = cartApi;
