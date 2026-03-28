import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

interface NavigationProps {
  onClose?: () => void;
}

export default function Navigation({ onClose }: NavigationProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/news"
        className={`${styles.link} ${isHomePage ? styles.homeLink : ""}`}
        onClick={onClose}
      >
        News
      </NavLink>
      <NavLink
        to="/find-pet"
        className={`${styles.link} ${isHomePage ? styles.homeLink : ""}`}
        onClick={onClose}
      >
        Find pet
      </NavLink>
      <NavLink
        to="/friends"
        className={`${styles.link} ${isHomePage ? styles.homeLink : ""}`}
        onClick={onClose}
      >
        Our friends
      </NavLink>
    </nav>
  );
}
