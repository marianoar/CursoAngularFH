import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country: Country | null | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private countriesService: CountriesService,
  ) {
    
  }

  ngOnInit(): void {
    // con el {} está desescructurando las properties del params
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe( country =>{ 
      console.log(country);
        if(!country){
          return this.router.navigateByUrl('')
        }else{
          return this.country = country;
        }
      }) 
  }

  searchCountry(code:string){
    this.countriesService.searchCountryByAlphaCode(code)
    .subscribe( country =>{
    })
  }
}
