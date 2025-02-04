import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap, map, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [Region.Africa, Region.America, Region.Asia, Region.Europa, Region.Oceania];
  
  constructor(private http: HttpClient) { }

  get regions() :Region[]{
    return [...this._regions];
  }

  getCountrisByRegion(region: Region): Observable<SmallCountry[]>{

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    if(!region)
      return of([]); //lo convierto en un Observable

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries=> countries.map( c => ({ 
          name: c.name.common,
          cca3: c.cca3,
          borders: c.borders ?? []
        }))),
        tap(response => console.log({response}))
      );
  }

  getCountryByAlphaCode(code: string): Observable<SmallCountry>{
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;

    return this.http.get<Country>(url)
    .pipe(
      map( c=>({
        name: c.name.common,
        cca3: c.cca3,
        borders: c.borders ?? []
      }))
    )
  }

  getCountriesBordersByCodes(borders: string[]): Observable<SmallCountry[]>{
    if(!borders || borders.length === 0) 
      return of([]);

    const countriesRequest: Observable<SmallCountry>[] = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    });

    return combineLatest(countriesRequest)
  }
}
