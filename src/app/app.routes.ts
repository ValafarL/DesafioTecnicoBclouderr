import { Routes } from '@angular/router';
import { Home } from './feature/pages/home/home';
import { CountryDetails } from './feature/pages/country-details/country-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Countries - Home',
  },
  {
    path: 'country/:countryCode',
    component: CountryDetails,
  },
];
