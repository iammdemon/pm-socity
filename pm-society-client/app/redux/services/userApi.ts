import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  course?: string;
  amount?: number;
  role?: "member" | "admin";
  packageType?:
    | "IGNITE"
    | "ELEVATE"
    | "ASCEND"
    | "THE_SOCIETY"
    | "THE_SOCIETY_PLUS";
  subscriptionType?: "monthly" | "yearly" | "one_time";
  subscriptionId?: string;
  subscriptionStatus?: "active" | "canceled" | "past_due" | "unpaid";
  subscriptionEndDate?: string; // string because JSON dates are strings
  createdAt?: Date | string
}

interface UsersResponse {
  message: string;
  data: IUser[];
}

interface SingleUserResponse {
  message: string;
  user: IUser;
}

interface CompleteSubscriptionRequest {
  subscriptionId: string;
  customerId: string;  // ✅ add this field
  password: string;
}


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include", // send cookies if your backend needs auth
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query<UsersResponse, void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // Create an admin user
    createAdminUser: builder.mutation<SingleUserResponse, Partial<IUser>>({
      query: (userData) => ({
        url: "/users/create-admin",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),

    // Start a one-time payment checkout
    startCheckout: builder.mutation<
      { clientSecret: string; paymentIntentId: string },
      { packageType: string; subscriptionType?: string }
    >({
      query: (body) => ({
        url: "/users/checkout",
        method: "POST",
        body,
      }),
    }),

    // Start a subscription checkout
    startSubscriptionCheckout: builder.mutation<
      { subscriptionId: string; clientSecret: string; customerId: string },
      {
        packageType: string;
        subscriptionType: string;
        email: string;
        name: string;
      }
    >({
      query: (body) => ({
        url: "/users/subscription-checkout",
        method: "POST",
        body,
      }),
    }),

    completeSubscriptionRegistration: builder.mutation<
      SingleUserResponse,
      CompleteSubscriptionRequest
    >({
      query: (body) => ({
        url: "/users/verify-subscription",
        method: "POST",
        body,
      }),
    }),
    // Verify payment and register user
    verifyPayment: builder.mutation<
      SingleUserResponse,
      {
        paymentIntentId: string;
        email: string;
        name: string;
        password: string;
        course: string;
        amount: number;
        phoneNumber: string;
        packageType?: string;
        subscriptionType?: string;
      }
    >({
      query: (body) => ({
        url: "/users/verify-payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    // Cancel subscription
    cancelSubscription: builder.mutation<
      { message: string },
      { userId: string }
    >({
      query: (body) => ({
        url: "/users/cancel-subscription",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateAdminUserMutation,
  useStartCheckoutMutation,
  useStartSubscriptionCheckoutMutation,
  useVerifyPaymentMutation,
  useCancelSubscriptionMutation,
  useCompleteSubscriptionRegistrationMutation
} = userApi;
