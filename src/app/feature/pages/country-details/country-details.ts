import { Component, effect, inject, signal } from '@angular/core';
import { Header } from '../../header/header/header';
import { ApiService } from '../../../core/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Loading } from '../../../shared/components/loading';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ErrorMessage } from "../../../shared/components/error-message";
import { CountryDetailedInfo, CountrySimpleInfo } from '../../../core/models';

@Component({
  selector: 'app-country-details',
  imports: [Header, RouterLink, Loading, ErrorMessage],
  templateUrl: './country-details.html',
  styleUrl: './country-details.css',
})
export class CountryDetails {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  protected readonly country = signal<CountryDetailedInfo | null>(null);
  protected readonly error = signal<string | null>(null);
  borderCountries = signal<CountrySimpleInfo[]>([]);
  private ccn3 = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('countryCode'))),
  );

  constructor() {
    effect(() => {
      this.country.set(null);
      this.borderCountries.set([]);
      const ccn3 = this.ccn3();
      if (ccn3) {
        this.api.getCountryByCode(ccn3).subscribe({
          next: (data) => {
            this.error.set(null);
            const c = data;
            this.country.set(data);
            if (c.borders?.length) {
              this.api.getCountryBorders(c.borders.join(',')).subscribe({
                next: (borders: CountrySimpleInfo[]) => {
                  this.error.set(null);
                  this.borderCountries.set(borders);
                },
                error: (err) =>
                 this.error.set('Error fetching border countries details.'),
              });
            }
          },
          error: (err) => {
            this.error.set(null);
            if(err.status === 404) {
              this.error.set('Country not found.');
            } else if (err.status === 400) {
              this.error.set('Invalid country code.');
            }else{
              this.error.set('Failed to fetch country details.');
            }
          },
        });
      }
    });
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR').format(value);
  }

  getLanguages(): string {
    const langs = this.country()?.languages;
    if (!langs) return 'N/A';
    return Object.values(langs).join(', ');
  }

  getCurrencies(): string {
    const currencies = this.country()?.currencies;
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map((c: any) => `${c.name} (${c.symbol})`)
      .join(', ');
  }
}
