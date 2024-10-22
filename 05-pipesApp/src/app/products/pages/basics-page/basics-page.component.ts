import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {

  public nameLower: string = 'neoris';
  public nameUpper: string = "NEORIS";
  public fullName: string = "neORis";

  public customDate: Date = new Date();
}
