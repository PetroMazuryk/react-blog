import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Container from "@mui/material/Container";
import { Header } from "./components/Header/Header";
import { current } from "./redux/auth/operations";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Loader from "./components/Loader/Loader";

const Home = lazy(() => import("./pages/Home"));
const FullPost = lazy(() => import("./pages/FullPost"));
const AddPost = lazy(() => import("./pages/AddPost/AddPost"));
const Login = lazy(() => import("./pages/Login/Login"));
const Registration = lazy(() => import("./pages/Registration/Registration"));

function App() {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsRefreshing(false);
      return;
    }

    dispatch(current()).finally(() => setIsRefreshing(false));
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />

            <Route
              path="/add-post"
              element={
                <ProtectedRoute>
                  <AddPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <AddPost />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Container>
      </Suspense>
    </>
  );
}

export default App;
