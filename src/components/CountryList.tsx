import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../GraphQl/queries";
import { CountriesData, Country } from "./types";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const CountryList = () => {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES, {
    skip: !!localStorage.getItem("countries"), // Skip query if data exists in localStorage
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Load cached countries or set new data
  useEffect(() => {
    const cachedCountries = localStorage.getItem("countries");

    if (cachedCountries) {
      setCountries(JSON.parse(cachedCountries));
    } else if (data) {
      const fetchedCountries = data.countries.edges.map((edge) => edge.node);
      setCountries(fetchedCountries);
      localStorage.setItem("countries", JSON.stringify(fetchedCountries));
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error)
    return <p>Error: {error.message}, please check your internet connection</p>;

  // Process countries based on user input
  let filteredCountries = [...countries];

  // Filter by region
  if (filterRegion !== "All") {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === filterRegion
    );
  }

  // Filter by language
  if (filterLanguage !== "All") {
    filteredCountries = filteredCountries.filter((country) =>
      country.languages.edges.some((lang) => lang.node.name === filterLanguage)
    );
  }

  // Search by name
  if (searchTerm) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort countries
  if (sortOption === "Name") {
    filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "Population") {
    filteredCountries.sort((a, b) => b.population - a.population);
  } else if (sortOption === "Area") {
    filteredCountries.sort((a, b) => b.area - a.area);
  }

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw] home">
      <div className="border border-white border-solid sm:h-[90%] sm:w-[85%] h-[95%] w-[95%] rounded-2xl sm:p-5 ">
        <div className="h-[100%] w-[100%] transparent rounded-2xl px-3">
          {/* Search and Filters */}
          <div className="h-14 flex items-center justify-center md:justify-end gap-3">
            {/* Search Bar */}
            <div className="search relative flex items-center p-2 bg-gray-200 rounded-full border border-solid border-gray-500 ">
              <span className="material-symbols-outlined ">search</span>
              <input
                className="outline-none bg-transparent w-[100%] ml-2 placeholder:italic placeholder:text-slate-400 placeholder:text-xs "
                type="text"
                placeholder="Search country by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tune Button */}
            <div
              className="cursor-pointer flex items-center bg-gray-200 border-gray-500 p-2 rounded-full hover:shadow-md "
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="material-symbols-outlined">tune</span>
              <span className="hidden sm:inline-block ml-2 text-sm">
                Filters
              </span>
            </div>
          </div>

          {/* Filters Dropdown */}
          {showFilters && (
            <div className="mt-3 flex justify-center flex-wrap gap-3 bg-black/60  p-4 shadow-lg rounded-lg  z-10 absolute w-[100%] left-0">
              {/* Region Filter */}
              <select
                className="p-2 border rounded-md"
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
              >
                <option value="All">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>

              {/* Language Filter */}
              <select
                className="p-2 border rounded-md"
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
              >
                <option value="All">All Languages</option>
                {Array.from(
                  new Set(
                    countries
                      .flatMap((country) =>
                        country.languages.edges.map((lang) => lang.node.name)
                      )
                      .filter(Boolean)
                  )
                ).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                className="p-2 border rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="Name">Name</option>
                <option value="Population">Population</option>
                <option value="Area">Area</option>
              </select>
            </div>
          )}

          {/* Display Filtered and Sorted Countries */}
          <div className="flex flex-col flex-wrap overflow-auto countries w-[100%] gap-5">
            {filteredCountries.map((country) => (
              <Link
                key={country.alpha3Code}
                to={`/country/${country.alpha3Code}`}
              >
                <div className="flex items-center gap-1 w-56 sm:w-60  ">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="h-7 w-7 object-cover"
                  />
                  <span className="flex flex-col text-sm  ">
                    <span className="font-bold text-ellipsis w-48 whitespace-nowrap overflow-hidden">
                      {country.name}
                    </span>

                    <span>
                      <span className=" font-bold text-[10px]">Capital:</span>
                      {country.capital}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryList;
