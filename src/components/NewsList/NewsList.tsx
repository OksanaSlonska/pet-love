import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.css";

interface NewsListProps {
  items: NewsData[];
}

interface NewsData {
  _id: string;
  title: string;
  text: string;
  date: string;
  url: string;
  imgUrl: string;
}

export default function NewsList({ items }: NewsListProps) {
  return (
    <ul className={styles.list}>
      {items.map(({ _id, imgUrl, title, text, date, url }) => (
        <li key={_id} className={styles.listItem}>
          <NewsItem
            imgUrl={imgUrl}
            title={title}
            text={text}
            date={date}
            url={url}
          />
        </li>
      ))}
    </ul>
  );
}
