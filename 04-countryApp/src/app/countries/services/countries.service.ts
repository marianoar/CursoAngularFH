import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode(code:string): Observable<Country[]> {
    const url =`${this.url}/alpha/${code}`;

    return this.http.get<Country[]>(code)
      .pipe(
          catchError(
            ()=>of([])
          )
        );
  }
  searchCapital(termino : string): Observable<Country[]>{
    const url =`${this.url}/capital/${termino}`;
    return this.http.get<Country[]>(url)
      .pipe( 
        catchError(error => {// ()=>of([])
          console.log(error);
          return of([]);
        })
      );
  }

  searchCountry(termino : string): Observable<Country[]>{
    const url =`${this.url}/name/${termino}`;
    return this.http.get<Country[]>(url)
      .pipe( 
        catchError(error => {// ()=>of([])
          console.log(error);
          return of([]);
        })
      );
  }

  searchRegion(termino : string): Observable<Country[]>{
    const url =`${this.url}/region/${termino}`;
    return this.http.get<Country[]>(url)
      .pipe( 
        catchError(error => {// ()=>of([])
          console.log(error);
          return of([]);
        })
      );
  }
}
