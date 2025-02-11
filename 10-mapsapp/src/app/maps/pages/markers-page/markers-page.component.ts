import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

//estas interfaces debe ir en arcvhivos independientes
interface MarkerAndColor {
  // hace esto porque la propiedad color es privada e innaccesible en el obj Marker
  color: string;
  marker: Marker;
}
interface PlainMarker {
  color: string;
  lngLat: number[];
}

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
  public markers: MarkerAndColor[] = [];

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

    this.readFromLocalStorage();
    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Mi marcador';
    // y lo mando en el constructor del objeto {element:markerHTML}
    const marker = new Marker({ color: 'green' }).setLngLat(this.currentLngLat).addTo(this.map);
  }

  createMarker() {
    if (!this.map)
      return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }
  addMarker(lngLat: LngLat, color: string) {
    if (!this.map)
      return;

    const marker = new Marker({ color: color, draggable: true }).setLngLat(lngLat).addTo(this.map);

    this.markers.push(
      { color, marker } // no hace falta hacer color:color 
    );

    this.saveToLocalStorage();

    marker.on('dragend', ()=>{
      console.log(marker.getLngLat());
      this.saveToLocalStorage(); // puedo hacer esto pues son valores por Referencia
    })
  }
  deleteMarker(i: number) {
    this.markers[i].marker.remove();
    this.markers.splice(i, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    // console.log(this.markers);
    const PlainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(PlainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); // inseguro , revisar

    plainMarkers.forEach( ({color, lngLat})=>{
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    })
  }
}
