import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
