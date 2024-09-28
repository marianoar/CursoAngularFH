import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  searchCapital(termino : string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.url}/capital/${termino}`);
  }
}
