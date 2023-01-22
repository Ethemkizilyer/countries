import type { NextPage } from "next";
import CountryCard from "../components/CountryCard";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import SearchInput from "../components/SearchInput";
import { useQuery } from "@tanstack/react-query";
import {
  ContinentsType,
  getAllCountriesService,
  getCountriesByContinentService,
} from "../services";
import Loading from "../components/Loading";
import LazyLoad from "react-lazy-load";

const HomePage: NextPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<ContinentsType | "">("");
  const [searchValue, setSearchValue] = useState("");
  // Bileşen/sayfa bağlandığında // React-Query ve getAllCountriesService hizmetini kullanarak tüm ülkeleri getir. Bu yaklaşım, CSR'yi (Client Side Rendering) // ve hataların/yükleme durumlarının işlenmesini göstermek için kullanılır. Ayrıca, tepki sorgusu, pencere yeniden odaklandığında // API'den yeniden getirecek şekilde yapılandırılmıştır, bu bazı durumlarda yararlı olabilir.
  const {
    fetchStatus: fetchStatusAllCountries,
    error: errorAllCountries,
    data: dataAllCountries,
  } = useQuery(["all-countries"], () => getAllCountriesService());
  // Dropdown bileşeninden seçilen bir filtre olduğunda // React-Query ve getCountriesByContinentService hizmetini kullanarak tüm ülkeleri bölgeye/kıtaya göre getir.
  const {
    fetchStatus: fetchStatusCountriesByRegion,
    error: errorCountriesByRegion,
    data: dataCountriesByRegion,
  } = useQuery(
    ["countries-by-region", selectedFilter],
    () => getCountriesByContinentService(selectedFilter),
    { enabled: !!selectedFilter && selectedFilter !== "Show All" }
  );

  // Ülkeler kart ızgarasını işleyen ve veri olmadığı, bir hata olduğu veya API çağrılarının yüklendiği durumları işleyen işlev.
  const renderCountryCards = () => {
    if (
      fetchStatusAllCountries === "fetching" ||
      fetchStatusCountriesByRegion === "fetching"
    ) {
      return <Loading />;
    }

    if (
      errorAllCountries ||
      dataAllCountries?.ok === false ||
      errorCountriesByRegion ||
      dataCountriesByRegion?.ok === false
    ) {
      return (
        <p className="flex h-screen w-full justify-center content-center text-xl font-nunito-regular">
          Error while retrieving country data...
        </p>
      );
    }

    const countriesFromApi =
      selectedFilter && selectedFilter !== "Show All"
        ? dataCountriesByRegion?.data
        : dataAllCountries?.data;

    const filteredCountries = countriesFromApi?.filter((country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (!filteredCountries || filteredCountries.length === 0) {
      return (
        <p className="flex h-screen w-full justify-center content-center text-xl font-nunito-regular">
          No country data found...
        </p>
      );
    }

    return (
      <div
        className="grid 3xl:grid-cols-6 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1
       gap-y-14 gap-x-32 w-full sm:justify-items-center"
      >
        {filteredCountries.map((country, index) => (
          <LazyLoad key={index + country.capital}>
            <CountryCard key={index} country={country} />
          </LazyLoad>
        ))}
      </div>
    );
  };

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
      {renderCountryCards()}
    </main>
  );
};

export default HomePage;
