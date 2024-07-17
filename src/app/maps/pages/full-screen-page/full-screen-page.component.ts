import { AfterViewInit, Component, ElementRef, ViewChild, } from '@angular/core';
import {control, Map, map, tileLayer} from 'leaflet';
//import * as L from 'leaflet';

@Component({
  selector: 'maps-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  //private map?: Map;
  //HTML local reference "map" to avoid duplicating the same map in multiple elements
  @ViewChild('map')
  public divMap?: ElementRef;

  initMap(){
    if(!this.divMap) throw "Element map wasn't found"
    //Define the initial map
    const myMap = map(this.divMap.nativeElement, {zoomControl: false}).setView([51.505, -0.09], 13);

    //Define traversable layer tiles
    const Layers = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
