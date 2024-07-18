import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { LatLngExpression, tileLayer, Map, map, Marker } from 'leaflet'

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  @Input() latLng?: LatLngExpression;

  @ViewChild('map') public divMap?: ElementRef;

  private myMap?: Map;

  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw "Map div not found"
    if(!this.latLng) throw "latLng can't be null"

    this.initMap();
  }

  initMap(){

    if(!this.divMap) throw "Element map wasn't found"
    //Define the initial map
    this.myMap = map(this.divMap.nativeElement, {zoomControl: false}).setView(this.latLng!, 15);

    //Define traversable layer tiles
    const Layers = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.myMap);

    new Marker(this.latLng!)
      .addTo(this.myMap);

  }
}
