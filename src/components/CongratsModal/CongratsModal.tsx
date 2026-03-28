import Modal from "../../components/Modal/Modal";
import styles from "./CongratsModal.module.css";
import { useNavigate } from "react-router-dom";

interface CongratsModalProps {
  onClose: () => void;
}

export default function CongratsModal({ onClose }: CongratsModalProps) {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        {/* Иконка кота */}
        <div className={styles.iconCircle}>
          <img src="/favicon.png" alt="Congrats cat" className={styles.icon} />
        </div>

        <h2 className={styles.title}>Congrats!</h2>

        <p className={styles.text}>
          The first fluff in the favorites! May your friendship be the happiest
          and filled with fun.
        </p>

        <button
          type="button"
          className={styles.profileBtn}
          onClick={handleGoToProfile}
        >
          Go to profile
        </button>
      </div>
    </Modal>
  );
}
