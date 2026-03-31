import { useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo/Logo";
import styles from "./Header.module.css";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import Navigation from "./Navigation/Navigation";
import AuthNav from "./AuthNav/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";

import LogoutModal from "../LogoutModal/LogoutModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleConfirmLogout = () => {
    dispatch(logOut());
    setIsLogoutModalOpen(false);
  };

  return (
    <>
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
              {isLoggedIn ? (
                <div className={styles.userMenu}>
                  <button
                    className={styles.logoutBtn}
                    onClick={() => setIsLogoutModalOpen(true)}
                  >
                    LOG OUT
                  </button>

                  <Link to="/profile" className={styles.userLink}>
                    <div className={styles.userInfo}>
                      <div className={styles.userIconThumb}>
                        {user?.avatarURL || user?.avatar ? (
                          <img
                            src={user.avatarURL || user.avatar}
                            alt={user.name}
                            className={styles.userAvatarImg}
                          />
                        ) : (
                          <svg width="20" height="20">
                            <use href="/sprite.svg#icon-user"></use>
                          </svg>
                        )}
                      </div>
                      <span className={styles.userName}>{user?.name}</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className={styles.headerAuthOnlyDesktop}>
                  <AuthNav />
                </div>
              )}
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

        <MobileMenu
          isOpen={isOpen}
          onClose={toggleMenu}
          isHomePage={isHomePage}
        />
      </header>
      {isLogoutModalOpen && (
        <LogoutModal
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
}
