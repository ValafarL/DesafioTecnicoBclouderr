import { Component } from '@angular/core';
import { Countries } from '../../countries/countries';
import { Header } from '../../header/header/header';

@Component({
  selector: 'app-home',
  imports: [Countries, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
