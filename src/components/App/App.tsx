import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NewsPage = lazy(() => import("../../pages/NewsPage/NewsPage"));
const NoticesPage = lazy(() => import("../../pages/NoticesPage/NoticesPage"));
const OurFriendsPage = lazy(
  () => import("../../pages/OurFriendsPage/OurFriendsPage"),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="friends" element={<OurFriendsPage />} />

        <Route path="login" element={<div>Login Page</div>} />
        <Route path="register" element={<div>Register Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
