import Dropdown from "../components/Dropdown";
import SearchInput from "../components/SearchInput";
import { useState } from "react";

export type ContinentsType =
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania"
  | "Show All";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<ContinentsType | "">("");
  const [searchValue, setSearchValue] = useState("");
  return (
    <main className="pt-16 md:pt-32 px-8 md:px-32 pb-12 md:pb-0 min-h-screen bg-dmlm-white dark:bg-dm-very-dark-blue">
      <div className="flex justify-between flex-col md:flex-row gap-8 md:gap-1 mb-10">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Dropdown
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterArray={[
            "Africa",
            "Americas",
            "Asia",
            "Europe",
            "Oceania",
            "Show All",
          ]}
        />
      </div>
    </main>
  );
}
