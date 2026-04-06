import { HiStar } from "react-icons/hi";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import styles from "./NoticeCard.module.css";
import type { INotice } from "../../types/pet";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { selectFavorites } from "../../redux/auth/selectors";
import {
  addFavorite,
  removeFavorite,
  fetchNoticeById,
} from "../../redux/auth/operations";
import CongratsModal from "../CongratsModal/CongratsModal";
import { useState } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { AttentionModal } from "../ModalAttention/ModalAttention";
import { refreshUser } from "../../redux/auth/operations";

const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

interface NoticeCardProps {
  pet: INotice;
  onLearnMore?: (pet: INotice) => void;
  isFavoritePage?: boolean;
  onRemove?: (id: string) => void;
}

export default function NoticeCard({
  pet,
  onLearnMore,
  isFavoritePage = false,
}: NoticeCardProps) {
  const [showCongrats, setShowCongrats] = useState(false);

  const [isAttentionModalOpen, setIsAttentionModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector(selectFavorites);

  const isLiked = favorites.some((fav: string | INotice) => {
    const favId = typeof fav === "object" ? fav._id : fav;
    return favId === pet._id;
  });

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      setIsAttentionModalOpen(true);
      return;
    }

    if (isFavoritePage || isLiked) {
      dispatch(removeFavorite(pet._id))
        .unwrap()
        .then(() => {
          dispatch(refreshUser());
        });
    } else {
      const isFirstTime = favorites.length === 0;

      dispatch(addFavorite(pet._id))
        .unwrap()
        .then(() => {
          dispatch(refreshUser());

          if (isFirstTime) {
            setShowCongrats(true);
          }
        });
    }
  };

  const handleLearnMoreClick = () => {
    if (!isLoggedIn) {
      setIsAttentionModalOpen(true);
      return;
    }
    dispatch(fetchNoticeById(pet._id));

    onLearnMore?.(pet);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={pet.imgURL} alt={pet.title} className={styles.image} />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{pet.title}</h3>
            <div className={styles.rating}>
              <HiStar className={styles.starIcon} />
              <span className={styles.ratingCount}>{pet.popularity}</span>
            </div>
          </div>

          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.label}>Name</span>
              <span className={styles.value}>{pet.name}</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>Birthday</span>
              <span className={styles.value}>{formatDate(pet.birthday)}</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>Sex</span>
              <span className={styles.value}>{pet.sex}</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>Species</span>
              <span className={styles.value}>{pet.species}</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.label}>Category</span>
              <span className={styles.value}>{pet.category}</span>
            </li>
          </ul>

          <p className={styles.comment}>{pet.comment}</p>
        </div>
        <div className={styles.footer}>
          {pet.price ? (
            <p className={styles.price}>${pet.price}</p>
          ) : (
            <p className={styles.price}>Free</p>
          )}

          <div className={styles.btnGroup}>
            <button
              type="button"
              className={styles.learnMoreBtn}
              onClick={handleLearnMoreClick}
            >
              Learn more
            </button>
            <button
              type="button"
              className={isFavoritePage ? styles.deleteBtn : styles.favoriteBtn}
              onClick={handleFavoriteClick}
            >
              {isFavoritePage ? (
                <FiTrash2 size={18} />
              ) : (
                <FiHeart
                  size={18}
                  style={{
                    fill: isLiked ? "#F6B83D" : "transparent",
                    stroke: isLiked ? "#F6B83D" : "currentColor",
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {showCongrats && <CongratsModal onClose={() => setShowCongrats(false)} />}

      {isAttentionModalOpen && (
        <AttentionModal onClose={() => setIsAttentionModalOpen(false)} />
      )}
    </>
  );
}
