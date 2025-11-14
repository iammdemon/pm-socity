// app/redux/services/cohortPost.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// Type definitions
export interface User {
  _id: string;
  name: string;
  userName: string;
  avatar?: string;
}

export interface Cohort {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  memberCount: number;
}

export interface Reply {
  _id: string;
  author: User;
  content: string;
  reactions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CohortPost {
  _id: string;
  author: User;
  cohort: Cohort;
  content: string;
  imageUrl?: string;
  reactions: string[];
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

// Request/Response types
export interface CreatePostRequest {
  cohort: string;
  content: string;
}

export interface UpdatePostRequest {
  content?: string;
}

export interface AddReplyRequest {
  content: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session?.accessToken) {
      headers.set("authorization", `Bearer ${session.accessToken}`);
    }
    return headers;
  },
});

export const cohortPostApi = createApi({
  reducerPath: "cohortPostApi",
  baseQuery,
  tagTypes: ["CohortPost", "User", "Cohort"],
  endpoints: (builder) => ({
    // Create post
    createPost: builder.mutation<ApiResponse<CohortPost>, CreatePostRequest & { file?: File }>({
      query: ({ file, ...body }) => {
        const formData = new FormData();
        formData.append("cohort", body.cohort);
        formData.append("content", body.content);
        if (file) {
          formData.append("image", file);
        }
        
        return {
          url: "/cohort-posts",
          method: "POST",
          body: formData
        };
      },
      invalidatesTags: ["CohortPost"],
    }),

    // Get posts for user
    getMyPosts: builder.query<ApiResponse<CohortPost[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => ({ 
        url: `/cohort-posts/user?page=${page}&limit=${limit}`, 
        method: "GET" 
      }),
      providesTags: ["CohortPost"],
    }),

    // Get posts by cohort
    getPostsByCohort: builder.query<ApiResponse<CohortPost[]>, { cohortId: string; page?: number; limit?: number }>({
      query: ({ cohortId, page = 1, limit = 20 }) => ({ 
        url: `/cohort-posts/cohort/${cohortId}?page=${page}&limit=${limit}`, 
        method: "GET" 
      }),
      providesTags: ["CohortPost"],
    }),

    // Get post by ID
    getPostById: builder.query<ApiResponse<CohortPost>, string>({
      query: (postId) => ({ url: `/cohort-posts/${postId}`, method: "GET" }),
      providesTags: ["CohortPost"],
    }),

    // Update post
    updatePost: builder.mutation<ApiResponse<CohortPost>, { postId: string; data: UpdatePostRequest; file?: File }>({
      query: ({ postId, data, file }) => {
        const formData = new FormData();
        if (data.content) formData.append("content", data.content);
        if (file) {
          formData.append("image", file);
        }
        
        return {
          url: `/cohort-posts/${postId}`,
          method: "PATCH",
          body: formData
        };
      },
      invalidatesTags: ["CohortPost"],
    }),

    // Delete post
    deletePost: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (postId) => ({ url: `/cohort-posts/${postId}`, method: "DELETE" }),
      invalidatesTags: ["CohortPost"],
    }),

    // Add reply to post
    addReply: builder.mutation<ApiResponse<CohortPost>, { postId: string; data: AddReplyRequest }>({
      query: ({ postId, data }) => ({ 
        url: `/cohort-posts/${postId}/reply`, 
        method: "POST", 
        body: data 
      }),
      invalidatesTags: ["CohortPost"],
    }),

    // Toggle reaction on post
    toggleReactionOnPost: builder.mutation<ApiResponse<CohortPost>, string>({
      query: (postId) => ({ url: `/cohort-posts/${postId}/reaction`, method: "PATCH" }),
      invalidatesTags: ["CohortPost"],
    }),

    // Toggle reaction on reply
    toggleReactionOnReply: builder.mutation<ApiResponse<CohortPost>, { postId: string; replyId: string }>({
      query: ({ postId, replyId }) => ({ 
        url: `/cohort-posts/${postId}/reply/${replyId}/reaction`, 
        method: "PATCH" 
      }),
      invalidatesTags: ["CohortPost"],
    }),

    // Get user's cohorts
    getMyCohorts: builder.query<ApiResponse<Cohort[]>, void>({
      query: () => ({ url: "/cohorts/my", method: "GET" }),
      providesTags: ["Cohort"],
    }),
  }),
});

// Export typed hooks
export const {
  useCreatePostMutation,
  useGetMyPostsQuery,
  useGetPostsByCohortQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReplyMutation,
  useToggleReactionOnPostMutation,
  useToggleReactionOnReplyMutation,
  useGetMyCohortsQuery,
} = cohortPostApi;