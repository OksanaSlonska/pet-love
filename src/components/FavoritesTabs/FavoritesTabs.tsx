import { useState } from "react";
import styles from "./FavoritesTabs.module.css";
import {
  selectViewedIds,
  selectFavorites,
  selectNotices,
} from "../../redux/auth/selectors";
import NoticeCard from "../../components/NoticeCard/NoticeCard";
import { useDispatch, useSelector } from "react-redux";
import type { INotice } from "../../types/pet";
import Modal from "../Modal/Modal";
import NoticeDetail from "../NoticeDetail/NoticeDetail";
import { useEffect } from "react";
import { fetchNotices } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("favorites");
  const [selectedPet, setSelectedPet] = useState<INotice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotices({ page: 1, limit: 100 }));
  }, [dispatch]);

  const favoritePets = useSelector(selectFavorites);
  const viewedIds = useSelector(selectViewedIds) || [];
  const allNotices = useSelector(selectNotices) || [];
  const viewedPets = allNotices.filter((pet: INotice) =>
    viewedIds.includes(pet._id),
  );
  const currentPets = activeTab === "favorites" ? favoritePets : viewedPets;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const handleLearnMore = (pet: INotice) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "favorites" ? styles.active : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          My favorite pets
        </button>
        <button
          className={`${styles.tab} ${activeTab === "viewed" ? styles.active : ""}`}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>
      <div className={styles.container}>
        {currentPets.length > 0 ? (
          <div className={styles.grid}>
            {currentPets.map((pet: INotice) => (
              <NoticeCard
                key={pet._id}
                pet={pet}
                isFavoritePage={activeTab === "favorites"}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyWrapper}>
            <p className={styles.emptyText}>
              {activeTab === "favorites"
                ? "Oops, looks like there aren't any furries on your favorite list yet."
                : "Oops, looks like you haven't viewed any furries yet."}
            </p>
          </div>
        )}
      </div>

      {isModalOpen && selectedPet && (
        <Modal onClose={handleCloseModal}>
          <NoticeDetail pet={selectedPet} />
        </Modal>
      )}
    </div>
  );
}
