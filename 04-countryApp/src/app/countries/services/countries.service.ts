import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, delay } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  private getCountriesRequest( url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(()=>of([])),
      delay(2000)
    );
  }

  searchCountryByAlphaCode(code:string): Observable<Country | null> {
    const url =`${this.url}/alpha/${code}`;
console.log(code);
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries =>  countries.length > 0 ? countries[0] : null),
        catchError( ()=>of(null))
        );
  }

  searchCapital(termino : string): Observable<Country[]>{
    const url =`${this.url}/capital/${termino}`;
    return this.getCountriesRequest(url);
  }

  searchCountry(termino : string): Observable<Country[]>{
    const url =`${this.url}/name/${termino}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(termino : string): Observable<Country[]>{
    const url =`${this.url}/region/${termino}`;
    return this.getCountriesRequest(url);
  }
}
