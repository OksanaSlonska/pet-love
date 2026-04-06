import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiStar } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import type { INotice } from "../../types/pet.ts";
import { addFavorite, removeFavorite } from "../../redux/auth/operations";
import { selectFavorites } from "../../redux/auth/selectors";
import type { AppDispatch } from "../../redux/store";
import styles from "./NoticeDetail.module.css";
import toast from "react-hot-toast";

const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

interface NoticeDetailProps {
  pet: INotice;
}

const NoticeDetail: React.FC<NoticeDetailProps> = ({ pet }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectFavorites) || [];

  const isFavorite = favorites.some((fav: INotice) => {
    const favId = typeof fav === "string" ? fav : fav._id;

    return favId === pet._id;
  });

  const handleFavoriteClick = () => {
    const petId = (pet._id || pet._id) as string;

    if (!petId) {
      console.error("ID питомца не найден");
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(petId));
    } else {
      dispatch(addFavorite(petId));
    }
  };

  const rating = Math.round(pet.popularity / 20) || 1;

  const handleContactClick = () => {
    if (pet.user?.phone) {
      window.location.href = `tel:${pet.user.phone}`;
      toast.success(`Calling ${pet.user.phone}...`);
    } else {
      toast.error("Contact phone not provided by owner", {
        icon: "📞",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBlock}>
        <div className={styles.imgWrapper}>
          <img
            src={
              pet?.imgURL || "https://via.placeholder.com/280x280?text=No+Image"
            }
            alt={pet?.title || "Pet image"}
            className={styles.petImg}
          />
          <div className={styles.categoryBadge}>
            {pet?.category
              ? pet.category.charAt(0).toUpperCase() + pet.category.slice(1)
              : "Unknown"}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{pet.title}</h2>
        <div className={styles.ratingRow}>
          {[...Array(5)].map((_, index) => (
            <HiStar
              key={index}
              className={
                index < rating ? styles.starActive : styles.starInactive
              }
            />
          ))}
          <span className={styles.ratingValue}>{rating}</span>
        </div>

        <div className={styles.infoTable}>
          <div className={styles.infoCol}>
            <span className={styles.label}>Name</span>
            <span className={styles.value}>{pet.name}</span>
          </div>
          <div className={styles.infoCol}>
            <span className={styles.label}>Birthday</span>
            <span className={styles.value}>{formatDate(pet.birthday)}</span>
          </div>
          <div className={styles.infoCol}>
            <span className={styles.label}>Sex</span>
            <span className={styles.value}>{pet.sex}</span>
          </div>
          <div className={styles.infoCol}>
            <span className={styles.label}>Species</span>
            <span className={styles.value}>{pet.species}</span>
          </div>
        </div>
        <p className={styles.comment}>{pet.comment}</p>
        <p className={styles.price}>
          ${pet.price ? pet.price.toFixed(2) : "0.00"}
        </p>
        <div className={styles.btnGroup}>
          <button
            type="button"
            className={`${styles.addFavoriteBtn} ${isFavorite ? styles.isFavorite : ""}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? "Remove from" : "Add to"}{" "}
            <FiHeart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          <button
            type="button"
            className={styles.contactBtn}
            onClick={handleContactClick}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
