import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./Firebase";

const AuthRoute = ({ redirectPath = "/signup", children }) => {
  const [user] = useAuthState(auth);
  if (!user) {
    console.log("user", user);
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
};

export default AuthRoute;
