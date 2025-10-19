import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getSession } from "next-auth/react";

// Updated interfaces to match backend models
export interface IUser {
  _id: string;
  name: string;
  userName: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface IReply {
  _id: string;
  author?: IAuthor | IUser;
  content: string;
  reactions?: IUser[] | string[];
  createdAt: string;
  updatedAt: string;
  reactionCount?: number;
}

export interface IAuthor {
  _id: string;
  name: string;
  userName: string;
  avatar: string;
  bio: string;
  email: string;
}

export interface IForumTopic {
  _id: string;
  author: IAuthor;
  topicId: string;
  content: string;
  reactions: IUser[] | string[];
  replies: IReply[];
  createdAt: string;
  updatedAt: string;
  reactionCount?: number;
  replyCount?: number;
}

// Response types
interface ForumTopicsResponse {
  message: string;
  data: IForumTopic[];
}

interface SingleTopicResponse {
  message: string;
  data: IForumTopic;
}

interface ApiResponse {
  message: string;
  data: IForumTopic;
}

export const forumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ForumTopic", "Reply"],
  endpoints: (builder) => ({
    // Topics
    getForumTopics: builder.query<ForumTopicsResponse, void>({
      query: () => "forums",
      providesTags: ["ForumTopic"],
    }),
    getForumTopicById: builder.query<SingleTopicResponse, string>({
      query: (topicId) => `forums/${topicId}`,
      providesTags: ["ForumTopic"],
    }),
    createForumTopic: builder.mutation<ApiResponse, Partial<IForumTopic>>({
      query: (body) => ({
        url: "forums",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ForumTopic"],
    }),

    // Replies
    addReplyToTopic: builder.mutation<
      ApiResponse,
      { topicId: string; content: Partial<IReply> }
    >({
      query: ({ topicId, content }) => ({
        url: `forums/${topicId}/reply`,
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["ForumTopic"],
    }),

    // Reactions
    toggleReactionOnTopic: builder.mutation<
      ApiResponse,
      { topicId: string; userId: string }
    >({
      query: ({ topicId, userId }) => ({
        url: `forums/${topicId}/reaction`,
        method: "PATCH",
        body: { id: userId },
      }),
      invalidatesTags: ["ForumTopic"],
    }),

    toggleReactionOnReply: builder.mutation<
      ApiResponse,
      { topicId: string; replyId: string; userId: string }
    >({
      query: ({ topicId, replyId, userId }) => ({
        url: `forums/${topicId}/reply/${replyId}/reaction`,
        method: "PATCH",
        body: { id: userId },
      }),
      invalidatesTags: ["ForumTopic"],
    }),
  }),
});

export const {
  useGetForumTopicsQuery,
  useGetForumTopicByIdQuery,
  useCreateForumTopicMutation,
  useAddReplyToTopicMutation,
  useToggleReactionOnTopicMutation,
  useToggleReactionOnReplyMutation,
} = forumApi;
