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

export interface ILearningResource {
  _id?: string;
  title: string;
  shortDescription: string;
  linkUrl: string;
}

export interface ILearningResourceResponse {
  message: string;
  data: ILearningResource | ILearningResource[];
}

export const learningResourcesApi = createApi({
  reducerPath: "learningResourcesApi",
  baseQuery,
  tagTypes: ["LearningResource"],
  endpoints: (builder) => ({
    getLearningResources: builder.query({
      query: () => "/learning-resources",
      transformResponse: (response: { data: ILearningResource[] }) =>
        response.data,
      providesTags: ["LearningResource"],
    }),
    createLearningResource: builder.mutation({
      query: (resource: ILearningResource) => ({
        url: "/learning-resources",
        method: "POST",
        body: resource,
      }),
      invalidatesTags: ["LearningResource"],
    }),
    updateLearningResource: builder.mutation<
      ILearningResource,
      { id: string; resource: Partial<ILearningResource> }
    >({
      query: ({ id, resource }) => ({
        url: `/learning-resources/${id}`,
        method: "PATCH",
        body: resource,
      }),
      invalidatesTags: ["LearningResource"],
    }),

    deleteLearningResource: builder.mutation({
      query: (id: string) => ({
        url: `/learning-resources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningResource"],
    }),
  }),
});

export const {
  useGetLearningResourcesQuery,
  useCreateLearningResourceMutation,
  useUpdateLearningResourceMutation,
  useDeleteLearningResourceMutation,
} = learningResourcesApi;
