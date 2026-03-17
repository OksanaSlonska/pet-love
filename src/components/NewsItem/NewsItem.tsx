import styles from "./NewsItem.module.css";

interface NewsItemProps {
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function NewsItem({
  imgUrl,
  title,
  text,
  date,
  url,
}: NewsItemProps) {
  return (
    <article className={styles.card}>
      {/* Контейнер для картинки */}
      <div className={styles.imageThumb}>
        <img src={imgUrl} alt={title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{text}</p>

        <div className={styles.footer}>
          <span className={styles.date}>{formatDate(date)}</span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Read more
          </a>
        </div>
      </div>
    </article>
  );
}
