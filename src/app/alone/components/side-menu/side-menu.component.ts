import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  route: string,
  name: string,
}

@Component({
  selector: 'side-menu',
  standalone: true,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  imports: [RouterModule, CommonModule]
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    {route: "/maps/fullscreen", name: "FullScreen"},
    {route: "/maps/zoom-range", name: "ZoomRange"},
    {route: "/maps/markers", name: "Markers"},
    {route: "/maps/properties", name: "Properties"},
    {route: "/alone", name: "AloneComponent"},
  ];

}
