import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { control, map, tileLayer, Map, LatLngExpression, latLngBounds, latLng } from 'leaflet';

@Component({
  selector: 'maps-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements OnDestroy, AfterViewInit{

  private myMap?: Map;

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 6;

  public currentLngLat: LatLngExpression = [28.637446, -106.057549];

  //Define bounds fro longitude and latitude
  public southWest = latLng(-89.98155760646617, -180);
  public northEast = latLng(89.99346179538875, 180);
  public bounds = latLngBounds(this.southWest, this.northEast);


  ngAfterViewInit(): void {
    this.initMap();

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.myMap?.remove();
  }

  initMap() {
    if (!this.divMap) throw "Element map wasn't found";
    //Define the initial map && disable default zoom control
    this.myMap = map(this.divMap.nativeElement, {
      zoomControl: false,
      maxBounds: this.bounds,
      //maxBoundsViscosity: 1.0,
    }).setView(this.currentLngLat, this.currentZoom);

    //Define traversable layer tiles
    const Layers = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.myMap);
    //add zoom control on the bottom left

    this.myMap.addControl(control.zoom({ position: 'bottomleft' }));
  }

  mapListeners() {
    if (!this.myMap) throw 'Map not found!';

    this.myMap.on('zoom', (ev) => {
      this.currentZoom = this.myMap!.getZoom();
    });

    this.myMap.on('zoomend', (ev) => {
      if ( this.myMap!.getZoom() < 19 ) return;
      this.myMap!.zoomIn(19);
    });

    this.myMap.on('move', () => {
      this.currentLngLat = this.myMap!.getCenter();
    });
  }

  zoomChanged(value: string) {
    this.currentZoom = Number(value);
    this.myMap?.setZoom(this.currentZoom);
  }
}
