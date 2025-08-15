import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IBlog {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  image: string;
}

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ,
    credentials: "include", // send cookies if needed
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query<IBlog[], void>({
      query: () => "/blogs",
      providesTags: ["Blog"],
    }),
    getBlog: builder.query<IBlog, string>({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
    }),
    createBlog: builder.mutation<IBlog, Partial<IBlog>>({
      query: (body) => ({
        url: "/blogs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation<IBlog, { slug: string; body: Partial<IBlog> }>({
      query: ({ slug, body }) => ({
        url: `/blogs/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: "Blog", id: slug }],
    }),
    deleteBlog: builder.mutation<{ success: boolean; slug: string }, string>({
      query: (slug) => ({
        url: `/blogs/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
