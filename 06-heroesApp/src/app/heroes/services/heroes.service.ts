import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Hero } from "../interfaces/hero.interface";
import { environments } from "../../../environments/environments";

@Injectable({"providedIn": 'root'})
export class HeroesService{

    private baseUrl : string = environments.baseUrl;

    constructor(private http: HttpClient) {

        
    }

    getHeroes():Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById(id: string): Observable<Hero | undefined>{
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError( error => of(undefined))
            );
    }

    getSuggestions(query : string): Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&limit=6`);
    }

    addHero(hero: Hero): Observable<Hero>{
        return this.http.post<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    updateHero(hero: Hero): Observable<Hero>{
        if(!hero.id)
            throw Error("Hero es dato obligatorio");
        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    deleteHeroById(id: string): Observable<boolean>{
        // if(!id)
        //     throw Error("Hero es dato obligatorio");
        return this.http.delete(`${this.baseUrl}/heroes/${id}`)
                .pipe(
                    catchError(err => of(false)),
                    map(resp=> true)
                );
    }

}