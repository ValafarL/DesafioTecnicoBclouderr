import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CountryCard } from '../country-card/country-card';
import { SearchResult } from "../search-result/search-result";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Loading } from "../../shared/components/loading";
import { ErrorMessage } from "../../shared/components/error-message";
import { Country } from '../../core/models';

@Component({
  selector: 'app-countries',
  imports: [CountryCard, SearchResult, ReactiveFormsModule, Loading, ErrorMessage],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  searchControl = new FormControl(''); 
  searchResults = signal<any[]>([]);

  private api = inject(ApiService);
  protected readonly MAX_COUNTRIES_PER_PAGE = 10;
  protected readonly currentPage = signal<number>(1);
  protected readonly maxPages = signal<number>(1);

  private readonly allCountries = signal<Country[]>([]);
  private readonly filteredCountries = signal<Country[]>([]);
  protected readonly visibleCountries = signal<Country[]>([]);

  protected readonly error = signal<string | null>(null);

  ngOnInit() {
      this.searchControl.valueChanges
      .pipe(
        debounceTime(300),        
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
    this.api.getAllCountries().subscribe({
      next: (data: Country[]) => {
        this.allCountries.set(data);
        this.filteredCountries.set(data);
        this.maxPages.set(Math.ceil(data.length / this.MAX_COUNTRIES_PER_PAGE));
        this.currentPage.set(1);
        this.visibleCountries.set(data.slice(0, this.MAX_COUNTRIES_PER_PAGE));
      },
      error: (error) => {
        this.error.set('Failed to fetch countries.');
      },
    });
  }
  onChangePage(newPage: number) {
    this.currentPage.set(newPage);
    const startIndex = (newPage - 1) * this.MAX_COUNTRIES_PER_PAGE;
    const endIndex = startIndex + this.MAX_COUNTRIES_PER_PAGE;
    this.visibleCountries.set(
      this.filteredCountries().slice(startIndex, endIndex),
    );
  }
  onSelectRegion($event: Event) {
    const region = ($event.target as HTMLSelectElement).value;
    if (region === '') {
      this.filterChange(this.allCountries());
      return;
    }
    this.filterChange(this.allCountries().filter((country) => country.region === region));
  }
  filterChange(countries: Country[]) {
    this.filteredCountries.set(countries);
    this.maxPages.set(
      Math.ceil(countries.length / this.MAX_COUNTRIES_PER_PAGE),
    );
    this.onChangePage(1);
  }
  performSearch(term: string | null) {
    if (!term || term?.length < 2) {
      this.searchResults.set([]);
      return;
    }
    const filtered = this.allCountries()
      .filter((country) =>
        country.name.common.toLowerCase().includes(term.toLowerCase()),
      )
      .map((country) => ({
        name: country.name,
        flags: country.flags,
        ccn3: country.ccn3,
      }));
    this.searchResults.set(filtered);
  }
}
