import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map')
  divMap?: ElementRef;

  public zoom: number = 15;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-56.208239209291136, -34.90750655115182);

  ngAfterViewInit(): void {

    // console.log(this.divMap);

    if (!this.divMap)
      throw "El elemento HTML no fue encontrado";

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Mi marcador';
    // y lo mando en el constructor del objeto {element:markerHTML}
    const marker = new Marker({ color: 'green' }).setLngLat(this.currentLngLat).addTo(this.map);
  }

  createMarker(){
    if(!this.map)
      return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }
  addMarker(lngLat: LngLat, color:string){
    if(!this.map)
      return;

    const marker = new Marker({ color: color, draggable:true }).setLngLat(lngLat).addTo(this.map);
  }
}
