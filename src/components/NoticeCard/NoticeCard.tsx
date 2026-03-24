import { HiStar } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import styles from "./NoticeCard.module.css";

const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown";

  const date = new Date(dateString);

  // Проверяем, корректна ли дата
  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export default function NoticeCard({
  pet,
  onLearnMore,
}: {
  pet: any;
  onLearnMore: (pet: any) => void;
}) {
  return (
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

        {/* Таблица характеристик */}
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
            onClick={() => onLearnMore(pet)}
          >
            Learn more
          </button>
          <button type="button" className={styles.favoriteBtn}>
            <FiHeart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
