import BackButton from "./BackButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWeather } from "./getWeather";
import { Country } from "./types";

const CountryDetails = () => {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [neighbors, setNeighbors] = useState<string[]>([]);

  useEffect(() => {
    const cachedCountries = localStorage.getItem("countries");
    if (cachedCountries) {
      const countries: Country[] = JSON.parse(cachedCountries);

      // Find the selected country
      const matchedCountry = countries.find((c) => c.alpha3Code === code);
      if (matchedCountry) {
        setCountry(matchedCountry);

        // Fetch weather for the country's capital
        getWeather(matchedCountry.capital).then(setWeather);

        // Get neighboring country names (limit to first two)
        const neighborNames = matchedCountry.borders
          .map(
            (borderCode) =>
              countries.find((c) => c.alpha3Code === borderCode)?.name
          )
          .filter(Boolean) // Remove undefined values
          .slice(0, 2); // Limit to the first two names
        setNeighbors(neighborNames as string[]);
      }
    }
  }, [code]);

  if (!country) return <p>Country not found or data unavailable.</p>;

  return (
    <div
      className="flex flex-col justify-between"
      style={{
        backgroundImage: `url(${country.flag})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",

        padding: "20px",
      }}
    >
      {" "}
      <BackButton />
      <div className="opaque relative flex flex-col justify-between">
        <section className="relative pt-2 flex justify-end  ">
          {weather && (
            <div className=" pr-3 md:pr-5">
              <img
                src={weather?.current.condition.icon}
                alt="weather icon"
                className="absolute -right-4 -top-10 "
              />
              <h2 className="text-4xl text-black">
                {" "}
                {weather?.current.temp_c}°C
              </h2>
              <p
                className="text-[10px] md:text-xs"
                style={{
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                }}
              >
                Condition: {weather?.current.condition.text}
              </p>
            </div>
          )}
        </section>
        <section className=" ">
          <div className=" md:flex md:flex-col md:items-center mb-3 pl-2">
            <h1
              className="text-3xl"
              style={{
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
              }}
            >
              {country?.name}
            </h1>
            <p className="text-[10px] text-black md:text-xs">
              Capital: {country?.capital}
            </p>
          </div>
          <span className=" flex overflow-scroll text-black">
            <p className=" flex  items-center justify-center">
              <span className="border-r border-r-stone-500 border-solid flex flex-col items-center justify-center  min-w-44">
                <span className="text-[10px] md:text-xs">Population:</span>
                <span>{country?.population}</span>
              </span>
            </p>
            <p className=" flex  items-center justify-center ">
              <span className="border-r border-r-stone-500 border-solid flex flex-col items-center justify-center  min-w-44">
                <span className="text-[10px] md:text-xs">Region:</span>
                <span>{country?.region}</span>
              </span>
            </p>
            <p className="flex  items-center justify-center">
              <span className="border-r border-r-stone-500 border-solid flex flex-col items-center justify-center  min-w-44">
                <span className="text-[10px] md:text-xs">Area: </span>
                <span>{country?.area} km²</span>
              </span>
            </p>
            <p className=" flex items-center justify-center ">
              <span className="border-r border-r-stone-500 border-solid flex flex-col items-center justify-center  min-w-44">
                <span className="text-[10px] md:text-xs">TimeZone :</span>
                <span> {country.timezones[0]}</span>
              </span>
            </p>

            <p className=" flex  items-center justify-center ">
              <span className="border-r border-r-stone-500 border-solid flex flex-col items-center justify-center  min-w-44">
                <span className="text-[10px] md:text-xs">Language:</span>
                <span>{country.languages.edges[0].node.name}</span>
              </span>
            </p>

            <p className=" flex items-center justify-center">
              <span className="border-r border-r-stone-500 border-solid flex flex-col items-center justify-center min-w-44 ">
                <span className="text-[10px] md:text-xs">Currency:</span>
                <span className=" ">
                  <span>{country.currencies.edges[0].node.symbol}</span>
                  <span> {country.currencies.edges[0].node.name}</span>
                  <span>{`(${country.currencies.edges[0].node.code})`}</span>
                </span>
              </span>
            </p>
            <div className="flex flex-col items-center justify-center min-w-44 p-3">
              <span className="text-[10px] md:text-xs">
                Neighboring Countries:
              </span>
              {neighbors.length > 0 ? (
                <span>
                  {neighbors.map((neighbor) => (
                    <span key={neighbor}>{neighbor}, </span>
                  ))}
                </span>
              ) : (
                <p>No neighboring countries.</p>
              )}
            </div>
          </span>
        </section>
      </div>
    </div>
  );
};

export default CountryDetails;
