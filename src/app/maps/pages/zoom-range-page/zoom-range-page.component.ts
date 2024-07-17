import { Component, ElementRef, ViewChild } from '@angular/core';
import { control, map, tileLayer, Map, LatLngExpression} from 'leaflet';

@Component({
  selector: 'maps-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent {

  private myMap?: Map;

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 10;

  public currentLngLat: LatLngExpression = [51.505, -0.09];

  ngAfterViewInit(): void {
    this.initMap();

    this.mapListeners();
  }

  initMap(){
    if(!this.divMap) throw "Element map wasn't found"
    //Define the initial map && disable default zoom control
    this.myMap = map(this.divMap.nativeElement, {zoomControl: false}).setView(this.currentLngLat, this.currentZoom);

    //Define traversable layer tiles
    const Layers = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.myMap);
    //add zoom control on the bottom left

    this.myMap.addControl(control.zoom({ position: 'bottomleft' }));
  }


  mapListeners() {
    if ( !this.myMap ) throw 'Map not found!';

    this.myMap.on('zoom', (ev) => {
      this.currentZoom = this.myMap!.getZoom();
    });

    // this.myMap.on('zoomend', (ev) => {
    //   if ( this.myMap!.getZoom() < 19 ) return;
    //   this.myMap!.zoomIn(19);
    // });

    this.myMap.on('move', () => {
      this.currentLngLat = this.myMap!.getCenter();
    });
  }

  zoomChanged( value: string ) {
    this.currentZoom = Number(value);
    this.myMap?.setZoom( this.currentZoom );
  }
}

