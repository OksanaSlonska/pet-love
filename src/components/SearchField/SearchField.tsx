import { useState } from "react";
import styles from "./SearchField.module.css";
import { LuSearch, LuX } from "react-icons/lu";

interface SearchFieldProps {
  onSearch: (query: string) => void;
}

export default function SearchField({ onSearch }: SearchFieldProps) {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
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
        onChange={(e) => setValue(e.target.value)}
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
