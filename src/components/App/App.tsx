import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";

import type { AppDispatch } from "../../redux/store";
import { PrivateRoute } from "../PrivateRoute";
import ProfilePage from "../../pages/ProfilePage/Profile.Page";
import { RestrictedRoute } from "../RestrictedRoute";
import AddPetPage from "../../pages/AddPetPage/AddPetPage";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NewsPage = lazy(() => import("../../pages/NewsPage/NewsPage"));
const NoticesPage = lazy(() => import("../../pages/NoticesPage/NoticesPage"));
const OurFriendsPage = lazy(
  () => import("../../pages/OurFriendsPage/OurFriendsPage"),
);

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="find-pet" element={<NoticesPage />} />
          <Route path="friends" element={<OurFriendsPage />} />

          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/profile"
                component={<LoginPage />}
              />
            }
          />
          <Route path="register" element={<RegistrationPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="/login" component={<ProfilePage />} />
            }
          />
          <Route path="add-pet" element={<AddPetPage />} />
        </Route>
      </Routes>
    </>
  );
}
