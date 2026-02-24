import Header from "../../components/Header/Header";
import styles from "./HomePage.module.css";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.hero}>
        <Header />
        <div className="container">
          <h1 className={styles.title}>
            Take good <span>care </span>of your small pets
          </h1>
          <p className={styles.subtitle}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </section>
    </div>
  );
}
