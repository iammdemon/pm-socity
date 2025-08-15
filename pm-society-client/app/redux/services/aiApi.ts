import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AskRequest {
  question: string;
}

interface AskResponse {
  answer: string;
}

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery: fetchBaseQuery({ baseUrl:process.env.NEXT_PUBLIC_API_URL }), // adjust base URL if needed
  endpoints: (builder) => ({
    askTPMSAI: builder.mutation<AskResponse, AskRequest>({
      query: (body) => ({
        url: "/chat/gemini",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAskTPMSAIMutation } = aiApi;
