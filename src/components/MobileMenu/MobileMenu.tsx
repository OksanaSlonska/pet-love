import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations"; 
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import type { AppDispatch } from "../../redux/store";

import styles from "./MobileMenu.module.css";
import Navigation from "../Header/Navigation/Navigation";
import AuthNav from "../Header/AuthNav/AuthNav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage: boolean;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  isHomePage,
}: MobileMenuProps) => {

  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  
  const handleLogout = () => {
    dispatch(logOut());
    onClose();
  };

  if (!isOpen) return null;

  const menuClasses = `${styles.menuContent} ${
    isHomePage ? styles.isHome : styles.isNotHome
  }`;

  return (
    <div className={styles.overlay}>
      <div className={menuClasses}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg
            width="32"
            height="32"
           
            style={{ stroke: isHomePage ? "#262626" : "#fff" }}
          >
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <div className={styles.navWrapper}>
          <Navigation onClose={onClose} />
        </div>

        <div className={styles.authWrapper}>
          {isLoggedIn ? (
            <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
              LOG OUT
            </button>
          ) : (
            <AuthNav
              onClose={onClose}
              
              variant={isHomePage ? "dark" : "light"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
