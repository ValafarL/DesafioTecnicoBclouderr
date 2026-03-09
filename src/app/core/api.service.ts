import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, CountryDetailedInfo, CountrySimpleInfo } from './models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1';

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.apiUrl}/all?fields=name,population,region,flags,area,ccn3`,
    );
  }
  getCountryByCode(ccn3: string): Observable<CountryDetailedInfo> {
    return this.http.get<CountryDetailedInfo>(
      `${this.apiUrl}/alpha/${ccn3}?fields=name,flags,unMember,capital,region,borders,continents,population,area,languages,currencies,maps`,
    );
  }
  getCountryBorders(cca3: string): Observable<CountrySimpleInfo[]> {
    return this.http.get<CountrySimpleInfo[]>(
      `${this.apiUrl}/alpha?codes=${cca3}&fields=name,flags,ccn3`,
    );
  }
}
