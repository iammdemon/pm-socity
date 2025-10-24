import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Goal", "Achievement", "User"], // tags for cache invalidation
  endpoints: (builder) => ({
    // 🔒 Authenticated route using token
    getMe: builder.query({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: [{ type: "User", id: "ME" }],
    }),

    // 🔒 Change password
    changePassword: builder.mutation({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
    }),

    // 🔒 Get user by username
    getUserByUserName: builder.query({
      query: (userName: string) => ({ url: `/users/${userName}`, method: "GET" }),
    }),

    // 🔒 Toggle linked user
    toggleLink: builder.mutation({
      query: (linkedUserId: string) => ({ url: `/users/link/${linkedUserId}`, method: "PATCH" }),
    }),

    // 🔒 Update profile
    updateProfile: builder.mutation({
      query: (body) => ({ url: "/users/profile", method: "PUT", body }),
      invalidatesTags:[{type:"User", id:"ME"}]
    }),

    // 🎯 Goals CRUD
    getGoals: builder.query({
      query: () => ({ url: "/goals", method: "GET" }),
      providesTags: ["Goal"],
    }),
    createGoal: builder.mutation({
      query: (body) => ({ url: "/goals", method: "POST", body }),
      invalidatesTags: ["Goal"],
    }),
    updateGoal: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/goals/${id}`, method: "PUT", body }),
      invalidatesTags: ["Goal"],
    }),
    deleteGoal: builder.mutation({
      query: (id) => ({ url: `/goals/${id}`, method: "DELETE" }),
      invalidatesTags: ["Goal"],
    }),

    // 🏆 Achievements CRUD
    getAchievements: builder.query({
      query: () => ({ url: "/achievements", method: "GET" }),
      providesTags: ["Achievement"],
    }),
    createAchievement: builder.mutation({
      query: (body) => ({ url: "/achievements", method: "POST", body }),
      invalidatesTags: ["Achievement"],
    }),
    updateAchievement: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/achievements/${id}`, method: "PUT", body }),
      invalidatesTags: ["Achievement"],
    }),
    deleteAchievement: builder.mutation({
      query: (id) => ({ url: `/achievements/${id}`, method: "DELETE" }),
      invalidatesTags: ["Achievement"],
    }),
    search: builder.query({
      query: (query) => ({ url: `/search?q=${query}`, method: "GET" }),
      providesTags: ["User"],
    })
  }),
});

export const {
  useGetMeQuery,
  useChangePasswordMutation,
  useGetUserByUserNameQuery,
  useToggleLinkMutation,
  useUpdateProfileMutation,
  // Goals hooks
  useGetGoalsQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
  // Achievements hooks
  useGetAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useSearchQuery
} = authApi;
