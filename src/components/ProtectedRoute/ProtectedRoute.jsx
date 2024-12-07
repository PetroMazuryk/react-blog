import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/auth/slice";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
