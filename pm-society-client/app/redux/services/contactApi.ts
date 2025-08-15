
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
     baseUrl: process.env.NEXT_PUBLIC_API_URL ,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (formData) => ({
        url: '/contact',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitContactFormMutation } = contactApi;