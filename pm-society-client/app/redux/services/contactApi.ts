// redux/services/contactApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // Submit contact form
    submitContactForm: builder.mutation({
      query: (formData) => ({
        url: '/contact',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response) => response?.data || response,
    }),
    // Get all contact submissions
    getContactForm: builder.query({
      query: () => '/contact',
      transformResponse: (response) => response?.data || response,
    }),
  }),
});

export const { useSubmitContactFormMutation, useGetContactFormQuery } = contactApi;