import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url: string = "https://restcountries.com/v3.1";

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  }

  constructor(private http: HttpClient) { 
    this.loadFromLocalStorage();
  }

  private getCountriesRequest( url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(()=>of([])),
      // delay(2000)
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
    return this.getCountriesRequest(url)
      .pipe(
        tap( (countries: Country[]) => this.cacheStore.byCapital = {term: termino, countries: countries}),
        tap(()=> this.saveToLocalStorage())
      )
  }

  searchCountry(termino : string): Observable<Country[]>{
    const url =`${this.url}/name/${termino}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( (countries: Country[]) => this.cacheStore.byCountry = {term: termino, countries: countries}),
      tap(()=> this.saveToLocalStorage())
    );
  }

  searchRegion(termino : Region): Observable<Country[]>{
    const url =`${this.url}/region/${termino}`;
    return this.getCountriesRequest(url)
      .pipe(
      tap( (countries: Country[]) => this.cacheStore.byRegion = {region: termino, countries: countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheCountryStore', JSON.stringify(this.cacheStore));
  }
  private loadFromLocalStorage(){
    if(!localStorage.getItem("cacheCountryStore")) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheCountryStore')!);
  }
}
