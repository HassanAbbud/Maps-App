import { Component, ElementRef, ViewChild } from '@angular/core';
import { control, map, tileLayer } from 'leaflet';

@Component({
  selector: 'maps-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent {

  @ViewChild('map')
  public divMap?: ElementRef;

  initMap(){
    if(!this.divMap) throw "Element map wasn't found"
    //Define the initial map && disable default zoom control
    const myMap = map(this.divMap.nativeElement, {zoomControl: false}).setView([51.505, -0.09], 13);

    //Define traversable layer tiles
    const Layers = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap);
    //add zoom control on the bottom left

    myMap.addControl(control.zoom({ position: 'bottomleft' }));
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}

