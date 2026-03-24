import { useEffect, useState } from "react";
import axios from "axios";
import SearchField from "../../components/SearchField/SearchField";
import styles from "./NoticesPage.module.css";
import Select from "react-select";
import { customSelectStyles } from "./selectStyles";
import { FiSearch } from "react-icons/fi";
import NoticeCard from "../../components/NoticeCard/NoticeCard";
import type { INotice } from "../../types/pet";
import { IoCloseOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import Modal from "../../components/Modal/Modal";
import NoticeDetail from "../../components/NoticeDetail/NoticeDetail";

interface SelectOption {
  value: string;
  label: string;
}

const categoryOptions = [
  { value: "show-all", label: "Show all" },
  { value: "sell", label: "Sell" },
  { value: "free", label: "Free" },
  { value: "lost", label: "Lost" },
  { value: "found", label: "Found" },
];

const genderOptions = [
  { value: "show-all", label: "Show all" },
  { value: "unknown", label: "Unknown" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "multiple", label: "Multiple" },
];

const typeOptions = [
  { value: "", label: "Show all" },
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "monkey", label: "Monkey" },
  { value: "bird", label: "Bird" },
];

export default function NoticesPage() {
  const filters = ["Popular", "Unpopular", "Cheap", "Expensive"];

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const [category, setCategory] = useState<SelectOption | null>(null);
  const [gender, setGender] = useState<SelectOption | null>(null);
  const [type, setType] = useState<SelectOption | null>(null);

  const [notices, setNotices] = useState<INotice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [location, setLocation] = useState("");
  const [debouncedLocation, setDebouncedLocation] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setSearch(query);
    setPage(1);
  };

  const handleCategoryChange = (newValue: SelectOption | null) => {
    setCategory(newValue);
    setPage(1);
  };

  const handleTagClick = (tag: string) => {
    setActiveFilter(activeFilter === tag ? null : tag);
    setPage(1);
  };

  const handleLearnMore = (pet: any) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  // Функция закрытия
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "6",
          keyword: search,
          category: category?.value || "",
          sex: gender?.value || "",
          species: type?.value || "",
        });

        if (activeFilter) {
          if (activeFilter === "Cheap") params.append("sortBy", "cheap");
          if (activeFilter === "Popular") params.append("sortBy", "popular");
        }
        if (debouncedLocation) params.append("location", debouncedLocation);

        const response = await axios.get(
          `https://petlove.b.goit.study/api/notices?${params.toString()}`,
        );

        setNotices(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Ошибка при загрузке объявлений:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, [page, search, category, gender, type, activeFilter, debouncedLocation]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLocation(location);
    }, 500);

    return () => clearTimeout(handler);
  }, [location]);

  const handleReset = () => {
    setCategory(null);
    setGender(null);
    setType(null);
    setSearch("");
    setLocation("");
    setActiveFilter(null);
    setPage(1);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Find your favorite pet</h2>

        <div className={styles.filterBoard}>
          <div className={styles.searchWrapper}>
            <SearchField value={search} onSearch={handleSearch} />
          </div>

          <div className={styles.filtersWrapper}>
            <div className={styles.categoryWrapper}>
              <Select
                isClearable={true}
                options={categoryOptions}
                styles={customSelectStyles}
                placeholder="Category"
                value={category}
                onChange={handleCategoryChange}
                className={styles.selectItem}
              />
            </div>

            <div className={styles.genderWrapper}>
              <Select
                isClearable={true}
                options={genderOptions}
                styles={customSelectStyles}
                placeholder="By gender"
                value={gender}
                onChange={(val) => {
                  setGender(val);
                  setPage(1);
                }}
                className={styles.selectItem}
              />
            </div>

            <div className={styles.typeWrapper}>
              <Select
                isClearable={true}
                options={typeOptions}
                styles={customSelectStyles}
                placeholder="By type"
                value={type}
                onChange={(val) => {
                  setType(val);
                  setPage(1);
                }}
                className={styles.selectItem}
              />
            </div>

            <div className={styles.locationWrapper}>
              <input
                type="text"
                placeholder="Location"
                className={styles.locationInput}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setPage(1);
                }}
              />
              <div className={styles.locationButtons}>
                {location && (
                  <button
                    type="button"
                    className={styles.clearLocationBtn}
                    onClick={() => {
                      setLocation("");
                      setPage(1);
                    }}
                  >
                    <IoCloseOutline size={18} />
                  </button>
                )}
                <FiSearch className={styles.locationIcon} size={18} />
              </div>
            </div>

            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
            >
              Reset all filters
            </button>
            <hr className={styles.divider} />

            <ul
              className={styles.tagsList}
              role="radiogroup"
              aria-label="Pet filters"
            >
              {filters.map((filter) => (
                <li key={filter} role="none">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={activeFilter === filter}
                    className={`${styles.tagBtn} ${activeFilter === filter ? styles.active : ""}`}
                    onClick={() => handleTagClick(filter)}
                  >
                    {filter}
                    {activeFilter === filter && (
                      <IoCloseOutline className={styles.closeIcon} size={18} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isLoading ? (
          <p>Loading pets...</p>
        ) : (
          <ul className={styles.noticesList}>
            {Array.isArray(notices) &&
              notices.map((notice) => (
                <li key={notice._id}>
                  <NoticeCard pet={notice} onLearnMore={handleLearnMore} />
                </li>
              ))}
          </ul>
        )}
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

      {isModalOpen && selectedPet && (
        <Modal onClose={handleCloseModal}>
          <NoticeDetail pet={selectedPet} />
        </Modal>
      )}
    </section>
  );
}
