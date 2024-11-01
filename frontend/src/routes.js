import { lazy } from "react";


export const publicRoutes = [
  {
    path: "/login",
    exact: true,
    element: lazy(() => import("./pages/auth/Login.jsx")),
  },
  {
    path: "/forgot-password",
    exact: true,
    element: lazy(() => import("./pages/auth/ForgotPassword.jsx")),
  }, {
    path: "/forgot-password/:hash",
    exact: true,
    element: lazy(() => import("./pages/auth/ChangePassword.jsx")),
  },

];

 
export const adminRoutes = [
  {
    path: "/admin/dashboard",
    exact: true,
    element: lazy(() => import("./pages/admin/AdminDashboard.jsx")),
  },{
    path: "/admin/users",
    exact: true,
    element: lazy(() => import("./pages/admin/user/Users.jsx")),
  },{
    path: "/admin/real-time-data",
    exact: true,
    element: lazy(() => import("./pages/admin/data/Data.jsx")),
  }
  
];


 
export const ManagerRoutes = [
  {
    path: "/manager/dashboard",
    exact: true,
    element: lazy(() => import("./pages/manager/Dashboard.jsx")),
  },{
    path: "/manager/real-time-data",
    exact: true,
    element: lazy(() => import("./pages/admin/data/Data.jsx")),
  }
];

export const userRoutes = [
  {
    path: "/user/dashboard",
    exact: true,
    element: lazy(() => import("./pages/user/Dashboard.jsx")),
  },  {
    path: "/",
    exact: true,
    element: lazy(() => import("./pages/user/Dashboard.jsx")),
  }
];

 
