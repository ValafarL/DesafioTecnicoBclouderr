interface Flags {
    png: string;
    svg: string;
    alt: string;
}
interface NativeNameEntry {
  official: string;
  common: string;
}

interface Name {
    common: string;
    official: string;
    nativeName: {
        [key: string]: NativeNameEntry;
    };
}

interface Maps{
    googleMaps: string;
    openStreetMaps: string;
}

interface Currency{
    name: string;
    symbol: string;
}
export interface Country  {
    flags: Flags;
    name: Name;
    ccn3: string;
    region: string;
    area: number;
    population: number;
}

export interface CountrySimpleInfo {
    name: Name;
    flags: Flags;
    ccn3: string;
}

export interface CountryDetailedInfo extends Country {
    unMember: boolean;
    capital: string[];
    borders: string[];
    languages: {
        [key: string]: string;
    };
    continents: string[];
    maps: Maps;
    currencies: {
        [key: string]: Currency;
    };
}