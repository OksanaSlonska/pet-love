import { useState } from "react";
import styles from "./SearchField.module.css";
import { LuSearch } from "react-icons/lu"; 

interface SearchFieldProps{
  onSearch: (query: string) => void;
}

export default function SearchField({onSearch}: SearchFieldProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className={styles.searchButton}>
        <LuSearch size={18} />
      </button>
    </form>
  );
}
