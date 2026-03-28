import { FiEdit2 } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

import styles from "./UserCard.module.css";

interface UserCardProps {
  onEdit: () => void;
}

export default function UserCard({ onEdit }: UserCardProps) {
  const user = useSelector(selectUser);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.userBadge}>
          User <FaUser size={18} />
        </div>
        <button className={styles.editBtn} onClick={onEdit}>
          <FiEdit2 size={18} color="#F6B83D" />
        </button>
      </div>

      <div className={styles.avatarSection}>
        <div className={styles.avatarCircle}>
          {user?.avatarURL ? (
            <img
              src={user.avatarURL}
              alt="Avatar"
              className={styles.roundAvatar}
            />
          ) : (
            <FaUser size={40} color="#F6B83D" />
          )}
        </div>

        <button className={styles.uploadLink} onClick={onEdit}>
          Upload photo
        </button>
      </div>

      <div className={styles.infoSection}>
        <h3 className={styles.subTitle}>My information</h3>
        <div className={styles.inputsGroup}>
          <input
            readOnly
            value={user?.name || "Name not set"}
            className={styles.input}
          />
          <input
            readOnly
            value={user?.email || "Email not set"}
            className={styles.input}
          />
          <input
            readOnly
            value={user?.phone || "+380XXXXXXXXX"}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}
