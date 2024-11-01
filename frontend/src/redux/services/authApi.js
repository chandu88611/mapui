import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery"; // Ensure you have this set up correctly for your base API requests

export const AUTH_API = "authApi";

export const authApi = createApi({
  reducerPath: AUTH_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "user/auth",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "admin/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "user/forgot-password",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["auth"],
    }),
    resetPassword: builder.mutation({
      query: (data, token) => ({
        url: `user/reset-password/${token}`,
        method: "POST",
        body: data, // Assuming data includes the new password and token
      }),
      invalidatesTags: ["auth"],
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "user/register",
        method: "POST",
        body: userData, // Assuming userData includes user registration details
      }),
      invalidatesTags: ["auth"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "user/get-all-users",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    getUserDetailsById: builder.query({
      query: (id) => ({
        url: `user/${id}`, // Assuming the API endpoint expects the user ID as a URL parameter
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    // New mutation for updating user details
    updateUserDetails: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `user/update-user/${id}`,
        method: "PUT",
        body: updatedData, // Assuming updatedData contains the updated user details
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLazyGetUserProfileQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
  useGetAllUsersQuery,
  useGetUserDetailsByIdQuery,
  useUpdateUserDetailsMutation, // Exporting the new mutation hook
} = authApi;
