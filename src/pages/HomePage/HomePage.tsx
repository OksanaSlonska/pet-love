import styles from "./HomePage.module.css";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.hero}>
        {/* <Header /> */}
        <div className="container">
          <div className={styles.textWrapper}>
            <h1 className={styles.title}>
              Take good <span>care </span>of your small pets
            </h1>
            <p className={styles.subtitle}>
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </p>
          </div>
        </div>
      </section>
      <div className={styles.imageWrapper}>
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet="/images/image-decktop.jpg 1x, /images/image-decktop@2x.jpg 2x"
          />

          <source
            media="(min-width: 768px)"
            srcSet="/images/image-tablet.jpg 1x, /images/image-tablet@2x.jpg 2x"
          />

          <source srcSet="/images/image-mobile.jpg 1x, /images/image-mobile@2x.jpg 2x" />

          <img
            src="/images/image-mobile.jpg"
            alt="Girl with a dog"
            className={styles.heroImage}
          />
        </picture>
      </div>
    </div>
  );
}
