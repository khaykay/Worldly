export interface Currency {
  name: string;
  code: string;
  symbol: string;
}

export interface Language {
  name: string;
}

export interface Country {
  name: string;
  alpha3Code: string;
  capital: string;
  region: string;
  population: number;
  area: number;
  timezones: string[];
  borders: string[];
  flag: string;
  currencies: { edges: { node: Currency }[] };
  languages: { edges: { node: Language }[] };
}

export interface CountryNode {
  node: Country;
}

export interface CountriesData {
  countries: {
    edges: CountryNode[];
  };
}
