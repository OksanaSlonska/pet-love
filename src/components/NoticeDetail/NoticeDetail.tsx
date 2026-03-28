import React from "react";
import { HiStar } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import type { INotice } from "../../types/pet.ts";
import styles from "./NoticeDetail.module.css";

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
  const rating = Math.round(pet.popularity / 20) || 1;

  return (
    <div className={styles.container}>
      <div className={styles.imgBlock}>
        <div className={styles.imgWrapper}>
          <img src={pet.imgURL} alt={pet.title} className={styles.petImg} />
          <div className={styles.categoryBadge}>
            {pet.category.charAt(0).toUpperCase() + pet.category.slice(1)}
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
          <span className={styles.ratingValue}>1</span>
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
          <button type="button" className={styles.addFavoriteBtn}>
            Add to <FiHeart size={18} />
          </button>
          <button type="button" className={styles.contactBtn}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
