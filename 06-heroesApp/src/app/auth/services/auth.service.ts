import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { environments } from "../../../environments/environments";
import { User } from "../interfaces/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthService{

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) {
        
    }

    get currentUser():User | undefined{
        if(!this.user) return undefined;
        return structuredClone(this.user); //Creates a deep clone of an objett
    }

    login(email: string, password: string):Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                tap(user => localStorage.setItem('token', 'tokenSD5436DFG64564HFH456'))
            );
    }

    checkAuthentication(): Observable<boolean>{
        if(!localStorage.getItem('token'))
            return of(false);

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
                .pipe(
                    tap( user => this.user=user),
                    map( user => !!user), //porque lo que tengo que devolver es un booleano, no el user
                    catchError(err=> of(false))
                )

    }

    logout(){
        this.user = undefined;
        localStorage.clear();
    }
}