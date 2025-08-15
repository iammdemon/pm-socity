import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
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

    // 🔓 Public route - returns token to store in localStorage
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      // Store token and role in localStorage after successful login
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userRole', data.userRole);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),

    // 🔓 Public logout, clears localStorage
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // Clear localStorage after logout
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userRole');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),

    // 🔒 Needs token in Authorization header
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;