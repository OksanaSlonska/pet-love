import styles from "./SearchField.module.css";
import { LuSearch, LuX } from "react-icons/lu";

interface SearchFieldProps {
  onSearch: (query: string) => void;
  value: string;
}

export default function SearchField({ onSearch, value }: SearchFieldProps) {
  const handleClear = () => {
    onSearch("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        className={styles.searchInput}
      />

      <div className={styles.buttonsWrapper}>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearBtn}
          >
            <LuX size={18} />
          </button>
        )}

        <button type="submit" className={styles.searchBtn}>
          <LuSearch size={18} />
        </button>
      </div>
    </form>
  );
}
