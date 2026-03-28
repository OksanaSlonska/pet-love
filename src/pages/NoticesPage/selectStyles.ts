import type { StylesConfig, GroupBase } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

export const customSelectStyles: StylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    height: "42px",
    backgroundColor: "#fff",
    borderRadius: "30px",
    border: "1px solid rgba(38, 38, 38, 0.1)",
    padding: "0 8px",
    minHeight: "42px",
    boxShadow: "none",
    flexWrap: "nowrap",
  }),
  singleValue: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  placeholder: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    fontSize: "14px",
    color: "#262626",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#262626",
    "&:hover": { color: "#f6b83d" },
    padding: "8px",
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "15px",
    padding: "8px",
    marginTop: "4px",
    boxShadow: "0px 4px 36px 0px rgba(0, 0, 0, 0.02)", // Мягкая тень
  }),
  option: (provided, state) => {
    const isShowAll = state.label === "Show all";

    return {
      ...provided,
      backgroundColor: "transparent",
      color: state.isSelected
        ? "#f6b83d"
        : isShowAll
          ? "rgba(246, 184, 61, 0.5)"
          : "rgba(38, 38, 38, 0.6)",

      fontSize: "14px",
      padding: "8px 12px",
      cursor: "pointer",

      "&:active": { backgroundColor: "transparent" },
      "&:hover": {
        color: "#f6b83d",
      },
    };
  },
  clearIndicator: (provided) => ({
    ...provided,
    color: "rgba(38, 38, 38, 0.4)",
    cursor: "pointer",
    "&:hover": {
      color: "#f6b83d",
    },
  }),
};
