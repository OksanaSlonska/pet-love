import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

interface AuthNavProps {
  onClose?: () => void;
  variant?: "light" | "dark";
}

export default function AuthNav({ onClose, variant }: AuthNavProps) {
  // Определяем стили для контейнера и кнопок в зависимости от variant
  const isMobileMenu = variant === "light" || variant === "dark";

  const containerClass = `${styles.auth} ${isMobileMenu ? styles.mobileAuth : ""}`;

  // Динамические классы для кнопок
  const loginClass = `${styles.loginBtn} ${variant ? styles[variant] : ""}`;
  const registerClass = `${styles.registerBtn} ${variant ? styles[variant] : ""}`;

  return (
    <div className={containerClass}>
      <NavLink to="/login" className={loginClass} onClick={onClose}>
        LOG IN
      </NavLink>
      <NavLink to="/register" className={registerClass} onClick={onClose}>
        REGISTRATION
      </NavLink>
    </div>
  );
}
