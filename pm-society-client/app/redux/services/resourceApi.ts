import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IResource {
  _id?: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

interface ResourcesResponse {
  message: string;
  data: IResource[];
}

export const resourceApi = createApi({
  reducerPath: 'resourceApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['Resource'],
  endpoints: (builder) => ({
    getResources: builder.query<ResourcesResponse, void>({
      query: () => 'resources',
      providesTags: ['Resource'],
    }),
    getResourceById: builder.query<IResource, string>({
      query: (id) => `resources/${id}`,
      providesTags: (result, error, id) => [{ type: 'Resource', id }],
    }),
    addResource: builder.mutation<IResource, Partial<IResource>>({
      query: (body) => ({
        url: 'resources',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Resource'],
    }),
    updateResource: builder.mutation<IResource, { id: string; data: Partial<IResource> }>({
      query: ({ id, data }) => ({
        url: `resources/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Resource', id }],
    }),
    deleteResource: builder.mutation<void, string>({
      query: (id) => ({
        url: `resources/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Resource', id }],
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetResourceByIdQuery,
  useAddResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} = resourceApi;
