import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { blogApi } from "./services/blogApi";
import { eventsApi } from "./services/eventApi";
import { resourceApi } from "./services/resourceApi";
import { forumApi } from "./services/forumApi";
import { aiApi } from "./services/aiApi";
import { userApi } from "./services/userApi";
import { contactApi } from "./services/contactApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [resourceApi.reducerPath]: resourceApi.reducer,
    [forumApi.reducerPath]: forumApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(blogApi.middleware)
      .concat(eventsApi.middleware)
      .concat(resourceApi.middleware)
      .concat(forumApi.middleware)
      .concat(aiApi.middleware)
      .concat(userApi.middleware).concat(contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
