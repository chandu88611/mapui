import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: true, 
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen; // Toggle the sidebar's open state
    },
    openSidebar: (state) => {
      state.isOpen = true; // Open the sidebar
    },
    closeSidebar: (state) => {
      state.isOpen = false; // Close the sidebar
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
