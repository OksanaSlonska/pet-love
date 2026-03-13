import { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "../../components/NewsList/NewsList";
import SearchField from "../../components/SearchField/SearchField";
import styles from "./NewsPage.module.css";
import ReactPaginate from "react-paginate";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          "https://petlove.b.goit.study/api/news",
          {
            params: { page, limit: 6 },
          },
        );

        setNews(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  return (
    <section>
      <div className="container">
        <div className={styles.containerSearsh}>
          <h2 className={styles.title}>News</h2>
          <SearchField onSearch={handleSubmit} />
        </div>

        {isLoading ? <p>Loading...</p> : <NewsList items={news} />}
        <div className={styles.paginationWrapper}>
          <button
            className={styles.extraBtn}
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <LuChevronsLeft size={20} />
          </button>

          <ReactPaginate
            pageRangeDisplayed={window.innerWidth < 768 ? 1 : 3}
            marginPagesDisplayed={window.innerWidth < 768 ? 0 : 1}
            forcePage={page - 1}
            onPageChange={(event) => setPage(event.selected + 1)}
            pageCount={totalPages}
            previousLabel={<LuChevronLeft size={20} />}
            nextLabel={<LuChevronRight size={20} />}
            containerClassName={styles.pagination}
            pageClassName={styles.pageItem}
            pageLinkClassName={styles.pageLink}
            previousClassName={styles.pageItem}
            previousLinkClassName={styles.pageLink}
            nextClassName={styles.pageItem}
            nextLinkClassName={styles.pageLink}
            activeLinkClassName={styles.activePage}
            breakLinkClassName={styles.pageLink}
          />

          <button
            className={styles.extraBtn}
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <LuChevronsRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
