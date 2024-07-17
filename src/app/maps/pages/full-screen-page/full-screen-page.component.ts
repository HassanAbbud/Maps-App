import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'maps-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit{
  private map?: L.Map;

  initMap(){
    this.map = L.map('map').setView([51.505, -0.09], 13);
    const Layers = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  ngOnInit(): void {
    this.initMap();
  }
}
