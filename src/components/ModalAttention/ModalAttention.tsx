import AuthNav from "../Header/AuthNav/AuthNav";
import Modal from "../Modal/Modal";

import styles from "./ModalAttention.module.css";

interface Props {
  onClose: () => void;
}

export const AttentionModal = ({ onClose }: Props) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.iconCircle}>
          <img
            src="/images/dog.webp"
            alt="Congrats dog"
            className={styles.icon}
          />
        </div>

        <h2 className={styles.title}>Attention</h2>

        <p className={styles.text}>
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>

        <div className={styles.navWrapper} onClick={onClose}>
          <AuthNav />
        </div>
      </div>
    </Modal>
  );
};
