import { Navigate, Outlet } from "react-router-dom";
const Protected = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};
export default Protected;
