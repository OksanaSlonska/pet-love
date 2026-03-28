import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <div
      className={`
      ${styles.appLayout} 
      ${isHomePage ? styles.homePageBackground : styles.innerPageBackground}
    `}
    >
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
