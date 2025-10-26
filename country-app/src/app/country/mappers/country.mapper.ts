import { Country } from "../interfaces/country.interface";
import { RestCountryResponse } from "../interfaces/rest-country.interface";

export class CountryMapper {

  static toCountry(resCountry: RestCountryResponse): Country {
    const country: Country = {
      cca2: resCountry.cca2,
      name: resCountry.translations['spa'].common ?? resCountry.name.common, //? Computed property because Translations is an object with dynamic keys
      capital: resCountry.capital ? resCountry.capital[0] : 'N/A',
      population: resCountry.population,
      flagSVG: resCountry.flags.svg,
      region: resCountry.region,
      subRegion: resCountry.subregion
    };
    return country;
  }

  static toCountries(resCountries: RestCountryResponse[]): Country[] {
    return resCountries.map(this.toCountry);
  }
}
