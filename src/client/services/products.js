import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/", prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
    }
  }

  ),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "products/" }),
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `products/${productId}/`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
