import AuthNav from "../Header/AuthNav/AuthNav";
import Navigation from "../Header/Navigation/Navigation";
import styles from "./MobileMenu.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  return (
    <div className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`}>
      <button className={styles.closeBtn} onClick={onClose}>
        <svg width="32" height="32">
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </button>

      <div className={styles.navWrapper}>
        <Navigation onClose={onClose} />
      </div>
      <div className={styles.authWrapper}>
        <AuthNav onClose={onClose} />
      </div>
    </div>
  );
}
