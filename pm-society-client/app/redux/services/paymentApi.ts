// app/redux/services/paymentApi.ts
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

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  packageType: string;
}

export interface CompletePurchaseRequest {
  paymentIntentId: string;
}

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  endpoints: (builder) => ({
    startLinkedinSupportCheckout: builder.mutation<PaymentIntentResponse, void>(
      {
        query: (body) => ({
          url: "/users/linkedin-payment",
          method: "POST",
          body,
        }),
      }
    ),
    completeLinkedinSupportPurchase: builder.mutation<
      { success: boolean; message: string },
      CompletePurchaseRequest
    >({
      query: (body) => ({
        url: "/users/verify-linkedin-payment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useStartLinkedinSupportCheckoutMutation,
  useCompleteLinkedinSupportPurchaseMutation,
} = paymentApi;
