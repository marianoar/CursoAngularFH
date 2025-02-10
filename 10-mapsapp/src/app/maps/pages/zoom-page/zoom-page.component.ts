import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {


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

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map)
      throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (event) => {
      if (this.map!.getZoom() < 20)
        return;
      this.map?.zoomTo(18);
    })

    this.map.on('moveend', ()=>{
      this.currentLngLat = this.map!.getCenter();
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }
  zoomChanged(valueZoom:string) {
    this.zoom = Number(valueZoom);
    this.map?.zoomTo(this.zoom);
  }
}
