import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface MenuItem{
  title: string;
  route: string;
}
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
// signal() => suena a mucho muy importante

  // es un tipo
  public menuItems = signal<MenuItem[]>([
    {title: 'Contador', route: 'counter'},
    {title: 'UserInfo', route: 'user'},
    {title: 'Mutaciones', route: 'properties'}
  ]);
  // public menuItem: MenuItem[] = [
  //   {title: 'Contador', route: 'counter'},
  //   {title: 'UserInfo', route: 'user'},
  //   {title: 'Mutaciones', route: 'properties'},
  // ]

}
