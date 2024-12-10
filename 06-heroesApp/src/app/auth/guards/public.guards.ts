import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class PublicGuard{

    // const checkAuthStatus = (): boolean | Observable<boolean> => {
    //     //se inyectan el AuthService y el Router
    //     const authService: AuthService = inject(AuthService);
    //     const router: Router = inject(Router);
       
    //     return authService.checkAuthentication().pipe(
    //       tap((isAuthenticated) => {
    //         if (isAuthenticated) {
    //           router.navigate(['/']);
    //         }
    //       })
    //     );
    //   };
    //   //No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
    //    const canActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    //   ) => {
    //     console.log('CanActivate');
    //     console.log({ route, state });
       
    //     return checkAuthStatus();
    //   };
       
    //    const canMatchGuard: CanMatchFn = ( //Tipado CanMatchFN
    //     route: Route,
    //     segments: UrlSegment[]
    //   ) => {
    //     console.log('CanMatch');
    //     console.log({ route, segments });
       
    //     return checkAuthStatus();
    //   };
}