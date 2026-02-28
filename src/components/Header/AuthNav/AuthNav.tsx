import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export default function AuthNav({ onClose }: { onClose?: () => void }) {
  return (
    <div className={styles.auth}>
      <NavLink to="/login" className={styles.loginBtn} onClick={onClose}>
        LOG IN
      </NavLink>
      <NavLink to="/register" className={styles.registerBtn} onClick={onClose}>
        REGISTRATION
      </NavLink>
    </div>
  );
}
