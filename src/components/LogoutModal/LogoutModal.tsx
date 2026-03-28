import Modal from "../../components/Modal/Modal";
import styles from "./LogoutModal.module.css";

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.iconCircle}>
          <img src="/favicon.png" alt="Cat icon" className={styles.icon} />
        </div>

        <h2 className={styles.title}>Already leaving?</h2>

        <div className={styles.btnGroup}>
          <button type="button" className={styles.yesBtn} onClick={onConfirm}>
            Yes
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
