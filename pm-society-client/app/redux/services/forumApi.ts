import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IForumTopic {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export interface IMessage {
  _id: string;
  topicId: string;
  userName: string;
  message: string;
  createdAt: string;
}

interface ForumTopicsResponse {
  message: string;
  data: IForumTopic[];
}

interface SingleTopicResponse {
  message: string;
  data: IForumTopic;
}

interface MessagesResponse {
  message: string;
  data: IMessage[];
}

export const forumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["ForumTopic", "ForumMessage"],
  endpoints: (builder) => ({
    // Topics
    getForumTopics: builder.query<ForumTopicsResponse, void>({
      query: () => "forums/topics",
      providesTags: ["ForumTopic"],
    }),
    getForumTopicBySlug: builder.query<SingleTopicResponse, string>({
      query: (slug) => `forums/topics/${slug}`,
      providesTags: ["ForumTopic"],
    }),
    addForumTopic: builder.mutation<IForumTopic, Partial<IForumTopic>>({
      query: (body) => ({
        url: "forums/topics",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ForumTopic"],
    }),
    deleteForumTopic: builder.mutation<void, string>({
      query: (slug) => ({
        url: `forums/topics/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ForumTopic"],
    }),

    // Messages (Replies)
    getMessagesByTopic: builder.query<MessagesResponse, string>({
      query: (topicId) => `forums/topics/${topicId}/messages`,
      providesTags: ["ForumMessage"],
    }),
    createMessage: builder.mutation<IMessage, { topicId: string; userName: string; message: string }>({
      query: ({ topicId, ...body }) => ({
        url: `forums/topics/${topicId}/messages`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ForumMessage"],
    }),
  }),
});

export const {
  useGetForumTopicsQuery,
  useGetForumTopicBySlugQuery,
  useAddForumTopicMutation,
  useDeleteForumTopicMutation,
  useGetMessagesByTopicQuery,
  useCreateMessageMutation,
} = forumApi;
