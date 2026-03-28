import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserPets } from "../../redux/auth/selectors";
import styles from "./MyPets.module.css";

import { PetCard } from "./PetCard";

interface Pet {
  _id: string;
  name: string;
  imgURL: string;
  birthday: string;
  sex: string;
  species: string;
}

export default function MyPets() {
  const navigate = useNavigate();

  const pets = useSelector(selectUserPets) as Pet[];

  const handleAddPetClick = () => {
    navigate("/add-pet");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My pets</h2>

        <button className={styles.addBtn} onClick={handleAddPetClick}>
          Add pet <span>+</span>
        </button>
      </div>

      <div className={styles.list}>
        {pets && pets.length > 0 ? (
          pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
        ) : (
          <p className={styles.emptyText}>You haven't added any pets yet.</p>
        )}
      </div>
    </div>
  );
}
