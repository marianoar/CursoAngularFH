import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    region:[ '', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];
  
  constructor(private fb: FormBuilder,
              private countriesService: CountriesService
    ){}

  ngOnInit(): void {
   this.onRegionChange();
   this.onCountryChange();
  }

    get regions(): Region[]{
      return this.countriesService.regions;
    }

    onRegionChange(): void{
      this.myForm.get('region')!.valueChanges
      .pipe(
        tap( ()=> this.myForm.get('country')!.setValue('')),
        switchMap(region=> this.countriesService.getCountrisByRegion(region))
      )
      .subscribe(value=>{
        this.countriesByRegion = value;
      })
    }

    onCountryChange():void{
      this.myForm.get('country')!.valueChanges
      .pipe(
        tap( ()=> this.myForm.get('border')!.setValue('')),
        filter((value:string) => value.length>0), // filtra la secuencia
        switchMap(alphaCode => this.countriesService.getCountryByAlphaCode(alphaCode)), //toma el valor del observable anterior y se subscribe
        switchMap(country => this.countriesService.getCountriesBordersByCodes(country.borders))
      )
      .subscribe(countries=>{
        // console.log({value})
        this.borders=countries;
      })
    }
}
