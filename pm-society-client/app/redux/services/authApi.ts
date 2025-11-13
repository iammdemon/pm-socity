import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session?.accessToken) {
      headers.set("authorization", `Bearer ${session.accessToken}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Goal", "Achievement", "User", "Cohort"],

  endpoints: (builder) => ({
    // 👤 AUTH
    getMe: builder.query({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: [{ type: "User", id: "ME" }],
    }),
    getUser: builder.query({
      query: () => ({ url: "/auth/user", method: "GET" }),
      providesTags: ["User"],
    }),
    updateAvatar: builder.mutation({
      query: (body) => ({ url: "/users/avatar", method: "PUT", body }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
    }),
    getUserByUserName: builder.query({
      query: (userName: string) => ({
        url: `/users/${userName}`,
        method: "GET",
      }),
    }),
    toggleLink: builder.mutation({
      query: (linkedUserId: string) => ({
        url: `/users/link/${linkedUserId}`,
        method: "PATCH",
      }),
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: "/users/profile", method: "PUT", body }),
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),

    // 🎯 GOALS
    getGoals: builder.query({
      query: () => ({ url: "/goals", method: "GET" }),
      providesTags: ["Goal"],
    }),
    createGoal: builder.mutation({
      query: (body) => ({ url: "/goals", method: "POST", body }),
      invalidatesTags: ["Goal"],
    }),
    updateGoal: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/goals/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Goal"],
    }),
    deleteGoal: builder.mutation({
      query: (id) => ({ url: `/goals/${id}`, method: "DELETE" }),
      invalidatesTags: ["Goal"],
    }),

    // 🏆 ACHIEVEMENTS
    getAchievements: builder.query({
      query: () => ({ url: "/achievements", method: "GET" }),
      providesTags: ["Achievement"],
    }),
    createAchievement: builder.mutation({
      query: (body) => ({ url: "/achievements", method: "POST", body }),
      invalidatesTags: ["Achievement"],
    }),
    updateAchievement: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/achievements/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Achievement"],
    }),
    deleteAchievement: builder.mutation({
      query: (id) => ({ url: `/achievements/${id}`, method: "DELETE" }),
      invalidatesTags: ["Achievement"],
    }),

    // 🔍 SEARCH
    search: builder.query({
      query: (query) => ({ url: `/search?q=${query}`, method: "GET" }),
      providesTags: ["User"],
    }),

    // 🧠 COHORT CRUD
    getCohorts: builder.query({
      query: (params) => ({
        url: "/cohorts",
        method: "GET",
        params,
      }),
      providesTags: ["Cohort"],
    }),

    getCohortById: builder.query({
      query: (id: string) => ({ url: `/cohorts/${id}`, method: "GET" }),
      providesTags: ["Cohort"], 
    }),

    createCohort: builder.mutation({
      query: (body) => ({ url: "/cohorts", method: "POST", body }),
      invalidatesTags: ["Cohort"],
    }),

    updateCohort: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cohorts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cohort"],
    }),

    deleteCohort: builder.mutation({
      query: (id: string) => ({
        url: `/cohorts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cohort"],
    }),

    // 👥 Member management
    addMemberToCohort: builder.mutation({
      query: ({ cohortId, userId }) => ({
        url: `/cohorts/${cohortId}/members`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Cohort"],
    }),

    removeMemberFromCohort: builder.mutation({
      query: ({ cohortId, userId }) => ({
        url: `/cohorts/${cohortId}/members/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cohort"],
    }),
  }),
});

// 🧩 Export hooks
export const {
  // auth
  useGetMeQuery,
  useGetUserQuery,
  useChangePasswordMutation,
  useGetUserByUserNameQuery,
  useToggleLinkMutation,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,

  // goals
  useGetGoalsQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,

  // achievements
  useGetAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,

  // search
  useSearchQuery,

  // cohorts
  useGetCohortsQuery,
  useGetCohortByIdQuery,
  useCreateCohortMutation,
  useUpdateCohortMutation,
  useDeleteCohortMutation,
  useAddMemberToCohortMutation,
  useRemoveMemberFromCohortMutation,
} = authApi;
