import { useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo/Logo";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import Navigation from "./Navigation/Navigation";
import AuthNav from "./AuthNav/AuthNav";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.homeHeader : ""}`}
    >
      <div className="container">
        <div className={styles.headerWrapper}>
          <Logo variant={isHomePage ? "light" : "dark"} />

          <div className={styles.desktopNav}>
            <Navigation />
          </div>

          <div className={styles.controls}>
            <div className={styles.desktopAuth}>
              <AuthNav />
            </div>

            {/* Кнопка профиля (UserNav) */}
            {/* <button className={styles.userBtn}>
              <svg width="20" height="20">
                <use href="/sprite.svg#icon-user"></use>
              </svg>
            </button> */}

            {/* Бургер-меню */}
            <button
              className={`${styles.burgerBtn} ${isHomePage ? styles.burgerLight : styles.burgerDark}`}
              onClick={toggleMenu}
            >
              <svg width="32" height="32">
                <use href="/sprite.svg#icon-menu"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </header>
  );
}
