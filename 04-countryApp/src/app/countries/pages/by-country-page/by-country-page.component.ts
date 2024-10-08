import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{
  
  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean= false;

  constructor(private countriesService: CountriesService) {
    
  }

  ngOnInit(): void {
    this.countries= this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  searchByCountry(value: string){
    this.isLoading = true;
    this.countriesService.searchCountry(value)
          .subscribe( c => {
            this.countries = c;
            this.isLoading = false;
          });
  }
}
