import styles from "./AddPetPage.module.css";
import { useNavigate } from "react-router-dom";
import AddPetForm from "../../components/AddPetForm/AddPetForm";

export default function AddPetPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/profile");
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.imageThumb}>
            <picture className={styles.dogImg}>
              <source
                media="(min-width: 1280px)"
                srcSet="/images/add-pet-desktop-1x.webp 1x, /images/add-pet-desktop-2x.webp 2x"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/images/add-pet-tablet-1x.webp 1x, /images/add-pet-tablet-2x.webp 2x"
              />
              <img
                src="/images/add-pet-mobile-1x.webp"
                alt="Dog"
                className={styles.dogImg}
              />
            </picture>
          </div>

          <div className={styles.formSide}>
            <AddPetForm onBack={handleGoBack} />
          </div>
        </div>
      </div>
    </section>
  );
}
