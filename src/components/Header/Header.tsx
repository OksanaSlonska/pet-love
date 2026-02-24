import { useLocation } from "react-router-dom";
import Logo from "./Logo/Logo";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.homeHeader : ""}`}
    >
      <div className="container">
        <div className={styles.headerWrapper}>
          <Logo variant={isHomePage ? "light" : "dark"} />

          <div className={styles.controls}>
            {/* Кнопка профиля (UserNav) */}
            <button className={styles.userBtn}>
              <svg width="20" height="20">
                <use href="/sprite.svg#icon-user"></use>
              </svg>
            </button>

            {/* Бургер-меню */}
            <button className={styles.burgerBtn}>
              <svg width="32" height="32">
                <use href="/sprite.svg#icon-menu"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
