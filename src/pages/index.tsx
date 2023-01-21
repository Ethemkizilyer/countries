import Dropdown from "../components/Dropdown";
import SearchInput from "../components/SearchInput";

export default function Home() {
  return (
    <main className="pt-16 md:pt-32 px-8 md:px-32 pb-12 md:pb-0 min-h-screen bg-dmlm-white dark:bg-dm-very-dark-blue">
      <div className="flex justify-between flex-col md:flex-row gap-8 md:gap-1 mb-10">
        <SearchInput />
        <Dropdown />
      </div>
    </main>
  );
}
