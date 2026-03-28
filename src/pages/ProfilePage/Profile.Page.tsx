import UserCard from "../../components/UserCard/UserCard";
import MyPets from "../../components/MyPets/MyPets";
import FavoritesTabs from "../../components/FavoritesTabs/FavoritesTabs";
import { logOut } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import styles from "./ProfilePage.module.css";
import type { AppDispatch } from "../../redux/store";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { EditUserForm } from "../../components/EditUserForm/EditUserForm";
import LogoutModal from "../../components/LogoutModal/LogoutModal";

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = () => {
    dispatch(logOut());
    setIsLogoutModalOpen(false);
  };

  return (
    <section className={styles.profileSection}>
      <div className="container">
        <div className={styles.leftColumn}>
          <div className={styles.whiteProfileCard}>
            <UserCard onEdit={openEditModal} />
            <MyPets />

            <button
              type="button"
              className={styles.logoutBtn}
              onClick={openLogoutModal}
            >
              LOG OUT
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <FavoritesTabs />
        </div>
      </div>

      {isLogoutModalOpen && (
        <LogoutModal
          onClose={closeLogoutModal}
          onConfirm={handleConfirmLogout}
        />
      )}

      {isEditModalOpen && (
        <Modal onClose={closeEditModal}>
          <EditUserForm onClose={closeEditModal} />
        </Modal>
      )}
    </section>
  );
}
