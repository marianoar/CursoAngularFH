import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignalsLayoutComponent } from "./layout/signals-layout/signals-layout.component";
import { CounterPageComponent } from "./pages/counter-page/counter-page.component";
import { UserinfoPageComponent } from "./pages/userinfo-page/userinfo-page.component";
import { PropertiesPageComponent } from "./pages/properties-page/properties-page.component";

const routes: Routes = [
    {
        path: '',
        component: SignalsLayoutComponent,
        children: [
            { path: 'counter', component: CounterPageComponent },
            { path: 'user', component: UserinfoPageComponent },
            { path: 'properties', component: PropertiesPageComponent },
            { path: '**', redirectTo: 'counter' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignalsRoutingModule {

}