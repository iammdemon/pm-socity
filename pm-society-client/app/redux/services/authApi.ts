import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async(headers) => {
   const session = await getSession()
   if (session) {
    headers.set('authorization', `Bearer ${session.accessToken}`)
   }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    // 🔒 Authenticated route using token from localStorage
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

   

    // 🔒 Needs token in Authorization header
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),

    updateProfile : builder.mutation({
        query: (body) => ({
        url: "/users/profile",
        method: "PUT",
        body,
      }),
    })
  }),
});

export const {
  useGetMeQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation
} = authApi;