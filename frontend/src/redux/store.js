import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import sidebarSlice from "./slices/sidebarSlice";
import { authApi } from "./services/authApi";
import { userApi } from "./services/usersApi";
import { weatherApi } from "./services/weatherApi";
 
const setUpStore = () => {
  const store = configureStore({
    reducer: {
  
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [weatherApi.reducerPath]: weatherApi.reducer,
      
      auth: authReducer,
      sidebar: sidebarSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        weatherApi.middleware,
        userApi.middleware,
         
      ),
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = setUpStore();
