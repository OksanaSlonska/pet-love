import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

interface LogoProps {
  variant: "light" | "dark";
}

export default function Logo({ variant }: LogoProps) {
  return (
    <NavLink to="/" className={`${styles.logo} ${styles[variant]}`}>
      petl
      <span className={styles.iconWrapper}>
        <svg width="17" height="17">
          <use href="/sprite.svg#icon-heart" className={styles.iconHeart}></use>
        </svg>
      </span>
      ve
    </NavLink>
  );
}
