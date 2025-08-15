import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IEvent {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  location: string;
}

interface EventsResponse {
  message: string;
  data: IEvent[];
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, void>({
      query: () => 'events',
      providesTags: ['Event'],
    }),
    getEventBySlug: builder.query<IEvent, string>({
      query: (slug) => `events/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Event', id: slug }],
    }),
    addEvent: builder.mutation<IEvent, Partial<IEvent>>({
      query: (body) => ({
        url: 'events',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Event'],
    }),
    updateEvent: builder.mutation<IEvent, { slug: string; data: Partial<IEvent> }>({
      query: ({ slug, data }) => ({
        url: `events/${slug}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: 'Event', id: slug }],
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (slug) => ({
        url: `events/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, slug) => [{ type: 'Event', id: slug }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventBySlugQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
