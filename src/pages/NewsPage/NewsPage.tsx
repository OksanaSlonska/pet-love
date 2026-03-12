import { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "../../components/NewsList/NewsList";
import SearchField from "../../components/SearchField/SearchField";
import styles from "./NewsPage.module.css";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          "https://petlove.b.goit.study/api/news",
        );

        setNews(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section>
      <div className="container">
        <div className={styles.containerSearsh}>
          <h2 className={styles.title}>News</h2>
          <SearchField />
        </div>
        {/* Передаем новости вниз по цепочке */}
        {isLoading ? <p>Loading...</p> : <NewsList items={news} />}
      </div>
    </section>
  );
}
