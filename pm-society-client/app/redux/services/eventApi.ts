import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export interface IEvent {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  location: string;
  joinedUser?: string[];
  joinedUserCount?: number;
}

export interface EventsResponse {
  message: string;
  data: IEvent[];
}
export interface SingleEventResponse {
  message: string;
  data: IEvent;
}

interface RegisterEventResponse {
  success: boolean;
  message: string;
  data: IEvent;
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

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery,

  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, void>({
      query: () => "events",
      providesTags: ["Event"],
    }),
    getEventBySlug: builder.query<SingleEventResponse, string>({
      query: (slug) => `events/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Event", id: slug }],
    }),
    addEvent: builder.mutation<IEvent, Partial<IEvent>>({
      query: (body) => ({
        url: "events",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation<
      IEvent,
      { slug: string; data: Partial<IEvent> }
    >({
      query: ({ slug, data }) => ({
        url: `events/${slug}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: "Event", id: slug },
      ],
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (slug) => ({
        url: `events/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, slug) => [{ type: "Event", id: slug }],
    }),
    registerEvent: builder.mutation<RegisterEventResponse, string>({
      query: (eventId) => ({
        url: `events/${eventId}/register`,
        method: "PUT",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventBySlugQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useRegisterEventMutation,
} = eventsApi;
