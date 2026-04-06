import { useDispatch } from "react-redux";
import { deletePet } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { LuTrash2 } from "react-icons/lu";
import styles from "./PetCard.module.css";

interface PetProps {
  pet: {
    _id: string;
    name: string;
    imgURL: string;
    birthday: string;
    sex: string;
    species: string;
  };
}

export const PetCard = ({ pet }: PetProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deletePet(pet._id));
  };
  return (
    <div className={styles.card}>
      <img src={pet.imgURL} alt={pet.name} className={styles.avatar} />

      <div className={styles.info}>
        <div className={styles.header}>
          <h4 className={styles.name}>{pet.name}</h4>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <LuTrash2 size={18} color="#F6B83D" />
          </button>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span>Name</span>
            <p>{pet.name}</p>
          </div>
          <div className={styles.detailItem}>
            <span>Birthday</span>
            <p>
              {pet.birthday
                ? pet.birthday.split("-").reverse().join(".")
                : "Unknown"}
            </p>
          </div>
          <div className={styles.detailItem}>
            <span>Sex</span>
            <p>{pet.sex}</p>
          </div>
          <div className={styles.detailItem}>
            <span>Species</span>
            <p>{pet.species}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
