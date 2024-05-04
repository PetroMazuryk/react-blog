// import "./App.scss";
import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Container from "@mui/material/Container";
import { Header } from "./components/Header/Header";

const Home = lazy(() => import("./pages/Home"));
const FullPost = lazy(() => import("./pages/FullPost"));
const AddPost = lazy(() => import("./pages/AddPost/AddPost"));
const Login = lazy(() => import("./pages/Login/Login"));
const Registration = lazy(() => import("./pages/Registration/Registration"));

function App() {
  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
}

export default App;
