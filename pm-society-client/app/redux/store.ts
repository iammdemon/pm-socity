import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { blogApi } from "./services/blogApi";
import { eventsApi } from "./services/eventApi";

import { forumApi } from "./services/forumApi";
import { userApi } from "./services/userApi";
import { contactApi } from "./services/contactApi";
import { resourceApi } from "./services/resourceApi";
import { learningResourcesApi } from "./services/learningResourcesApi";
import { cohortPostApi } from "./services/cohortPost";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [resourceApi.reducerPath]: resourceApi.reducer,
    [forumApi.reducerPath]: forumApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [learningResourcesApi.reducerPath]: learningResourcesApi.reducer,
    [cohortPostApi.reducerPath]: cohortPostApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(blogApi.middleware)
      .concat(eventsApi.middleware)
      .concat(resourceApi.middleware)
      .concat(forumApi.middleware)
      .concat(userApi.middleware)
      .concat(contactApi.middleware)
      .concat(learningResourcesApi.middleware)
      .concat(cohortPostApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
