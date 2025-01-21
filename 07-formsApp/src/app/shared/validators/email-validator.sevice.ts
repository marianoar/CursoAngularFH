import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { delay, Observable, of, subscribeOn, Subscriber } from "rxjs";

@Injectable({providedIn:'root'})
export class EmailValidatorService implements AsyncValidator{

    // validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    //     const email = control.value;

    //     return of({
    //         emailTaken: true
    //     }).pipe(
    //         delay(2000)
    //     )
    // }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
    {
        const email = control.value;
        
        const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber)=> {
            if( email === 'sarasa@hola.com'){
                subscriber.next({emailTaken: true});
                subscriber.complete();
            }
            subscriber.next(null);
            subscriber.complete();
        }).pipe(
            delay(2500)
        );
        return httpCallObservable;

        // return this.http.get<any[]>(`http://localhost:3001/user?q=${email}`)
        //         .pipe(
        //             map(resp => {
        //                 return (resp.length === 0) ? null : { emailTaken : true}
        //             })
        //         );
        
    }

    registerOnValidatorChange?(fn: () => void): void { // el ? indica que es opcional
        throw new Error("Method not implemented.");
    }

}