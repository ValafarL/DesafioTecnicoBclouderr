import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../../core/models';

@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.html',
  styleUrl: './country-card.css',
})
export class CountryCard {
  country = input.required<Country>();
  router = inject(Router);

  goToDetails() {
    this.router.navigate(['/country', this.country().ccn3]);
  }
  formatNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR').format(value);
  }
}
