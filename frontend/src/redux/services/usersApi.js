import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery";

export const USER_API = "userApi";

export const userApi = createApi({
  reducerPath: USER_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // List all user (Admin only)
    listUser: builder.query({
      query: ({ search = "", role = "", page = 1, limit = 10 } = {}) => ({
        url: "user",
        method: "GET",
        params: {
          search,
          role,
          page,
          limit,
        },
      }),
      providesTags: ["User"],
    }),
    
    // List executives
    listExecutives: builder.query({
      query: () => ({
        url: "user/get-all-executives",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Get user by ID
    getUserById: builder.query({
      query: (id) => ({
        url: `user/getuser/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Register a new user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "user/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Authenticate/Login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // Get profile of logged-in user
    getUserProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update profile of logged-in user
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: "user/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),

    // Update user role (Admin only)
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: "user/role",
        method: "PUT",
        body: { userId, role },
      }),
      invalidatesTags: ["User"],
    }),

    // Delete a user (Admin only)
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useListUserQuery,
  useListExecutivesQuery,
  useGetUserByIdQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
