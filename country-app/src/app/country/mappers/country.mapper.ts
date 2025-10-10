import { Country } from "../interfaces/country.interface";
import { RestCountryResponse } from "../interfaces/rest-country.interface";

export class CountryMapper {

  static toCountry(resCountry: RestCountryResponse): Country {
    const country: Country = {
      cca2: resCountry.cca2,
      name: resCountry.name.common,
      capital: resCountry.capital ? resCountry.capital[0] : 'N/A',
      population: resCountry.population,
      flagSVG: resCountry.flags.svg
    };
    return country;
  }

  static toCountries(resCountries: RestCountryResponse[]): Country[] {
    return resCountries.map(this.toCountry);
  }
}
