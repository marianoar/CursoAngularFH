import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';
import { MapsRoutingModule } from './maps-routing.module';

import mapboxgl from 'mapbox-gl';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFub2FyIiwiYSI6ImNtNno5dWp1MzAyY2MyeW9uZHZ1dWR5ZnMifQ.ziXiVaf6-QPEpG_Zn-UvQw';



@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomPageComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent, // cargo un componente aca pues es un Standalone
    SideMenuComponent
  ]
})
export class MapsModule { }
