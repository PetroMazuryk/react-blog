import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Container from "@mui/material/Container";
import { Header } from "./components/Header/Header";
import { current } from "./redux/auth/operations";
import { selectIsAuth } from "./redux/auth/slice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const FullPost = lazy(() => import("./pages/FullPost"));
const AddPost = lazy(() => import("./pages/AddPost/AddPost"));
const Login = lazy(() => import("./pages/Login/Login"));
const Registration = lazy(() => import("./pages/Registration/Registration"));

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />

            <Route
              path="/add-post"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AddPost />
                </ProtectedRoute>
              }
            />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
