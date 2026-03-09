import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountrySimpleInfo } from '../../core/models';

@Component({
  selector: 'app-search-result',
  imports: [RouterLink],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css',
})
export class SearchResult {
  countries = input.required<CountrySimpleInfo[]>();
}
