import { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { publicRoutes,  adminRoutes, userRoutes, ManagerRoutes } from "./routes";
 
import AdminLayout from "./layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux"; 
import { useLazyGetUserProfileQuery } from "./redux/services/authApi";
import { setUser } from "./redux/slices/authSlice";
import { toast } from "react-toastify";
import ManagerLayout from "./layout/ManagerLayout";
import UserLayout from "./layout/UserLayout";
 

const Router = () => {
  const userRole = useSelector((state) => state.auth);
  const [getUser] = useLazyGetUserProfileQuery();
  const location=useLocation()
const navigate=useNavigate()
const dispatch=useDispatch()
useEffect(() => {
  if(location.pathname.startsWith('/admin')||location.pathname.startsWith('/manager')){

    if (!sessionStorage.getItem("auth")) {
      navigate("/login", { replace: true });
    } else {
      const getuser1 = async () => {
        const res = await getUser();
  
        if (res?.data?.status) {
          dispatch(setUser(res?.data?.data))
        }else{
          toast.error("User unauthenticated. Please log in again.");
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 1500);
  
        }
      };
      getuser1();
    }
  }
}, [navigate]);
  return (
    <Routes>
      {/* Public Routes */}
      <Route >
        {publicRoutes.map((route, i) => (
          <Route
            key={`public-${i}`}
            path={route.path}
            element={
              <Suspense fallback={<Skeleton />}>
                <route.element />
              </Suspense>
            }
          />
        ))}
      </Route>
 
      {userRole?.user?.role === "admin" && (
        <Route path="/admin" element={<AdminLayout />}>
          {adminRoutes.map((route, i) => (
            <Route
              key={`admin-${i}`}
              path={route.path}
              element={
                <Suspense fallback={<Skeleton />}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
        </Route>
      )}

   
      { (
        <Route path="/" element={<UserLayout />}>
          {userRoutes.map((route, i) => (
            <Route
              key={`user-${i}`}
              path={route.path}
              element={
                <Suspense fallback={<Skeleton />}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
        </Route>
      )}

     
      {userRole?.user?.role === "manager" && (
        <Route path="/manager" element={<ManagerLayout />}>
          {ManagerRoutes.map((route, i) => (
            <Route
              key={`manager-${i}`}
              path={route.path}
              element={
                <Suspense fallback={<Skeleton />}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
        </Route>
      )}
  
    </Routes>
  );
};

export default Router;
