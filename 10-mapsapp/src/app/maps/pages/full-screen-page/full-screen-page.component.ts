import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})

export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') 
  divMap?: ElementRef;

  ngAfterViewInit(): void {

    console.log(this.divMap);

    if(!this.divMap)
      throw "El elemento HTML no fue encontrado";

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-56.15, -34.93], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
  }



}
