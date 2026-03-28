import { useState } from "react";
import styles from "./FavoritesTabs.module.css";
import { selectFavorites } from "../../redux/auth/selectors";
import NoticeCard from "../../components/NoticeCard/NoticeCard";
import { useSelector } from "react-redux";
import type { INotice } from "../../types/pet";
import Modal from "../Modal/Modal";
import NoticeDetail from "../NoticeDetail/NoticeDetail";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("favorites");
  const favoritePets = useSelector(selectFavorites);
  const [selectedPet, setSelectedPet] = useState<INotice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        {favoritePets.length > 0 ? (
          <div className={styles.grid}>
            {favoritePets.map((pet: INotice) => (
              <NoticeCard
                key={pet._id}
                pet={pet}
                isFavoritePage={true}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyWrapper}>
            <p className={styles.emptyText}>
              Oops,{" "}
              <span className={styles.highlight}>
                looks like there aren't any furries
              </span>
              on our adorable page yet. Do not worry! View your pets on the
              "find your favorite pet" page and add them to your favorites.
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
