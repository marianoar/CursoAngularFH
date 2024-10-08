import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  
  public countries: Country[] = [];
  public regions: Region[] = ["Africa", "America", "Asia", "Europe", "Oceania" ];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {
    
  }
  ngOnInit(): void {
   this.countries = this.countriesService.cacheStore.byRegion.countries;
   this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(value: Region){
    this.selectedRegion = value;
    this.isLoading= true;
    this.countriesService.searchRegion(value)
          .subscribe( c => {
            this.countries = c;
            this.isLoading = false;
          });
  }
}
