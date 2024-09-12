import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeroComponent } from "./hero/hero.component";
import { ListComponent } from "./list/list.component";

@NgModule({
    exports:[ // es necesario exportarlos 
        HeroComponent, 
        ListComponent
    ],
    declarations:[
        HeroComponent, 
        ListComponent
    ],
    imports:[
        CommonModule
    ]
})
export class HeroesModule{

}