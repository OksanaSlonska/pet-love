import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./MainLayout.module.css";

// import Loader from '../Loader/Loader';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className={styles.applayout}>
      {!isHomePage && <Header />}

      <main className={styles.pageWrapper}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
