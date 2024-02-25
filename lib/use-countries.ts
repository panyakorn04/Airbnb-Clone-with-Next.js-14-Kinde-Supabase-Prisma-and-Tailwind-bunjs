import countries from "world-countries";

const countriesFormatted = countries.map((country) => {
  return {
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latLang: country.latlng,
    region: country.region,
  };
});

const useCountries = () => {
  const getAllCountries = () => countriesFormatted;

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((country) => country.value === value);
  };

  return {
    getAllCountries,
    getCountryByValue,
  };
};

export default useCountries;
