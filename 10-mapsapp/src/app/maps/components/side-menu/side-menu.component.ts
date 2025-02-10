import { Component } from '@angular/core';

interface MenuItem {
  name:string;
  route: string;

}
@Component({
  selector: 'maps-side-menu', //el nombre del selector se puede utilizar como componenteclase del css
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen'},
    { route: '/maps/zoom-range', name: 'ZoomRange'},
    { route: '/maps/markers', name: 'Markers'},
    { route: '/maps/properties', name: 'Houses'},
  ]
}
