import { latLng } from 'leaflet';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  control,
  latLngBounds,
  LatLngExpression,
  map,
  Map,
  Marker,
  tileLayer,
  marker,
  icon,
} from 'leaflet';

@Component({
  selector: 'maps-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements OnDestroy, AfterViewInit {

  private myMap?: Map;

  private myMarker: Marker = marker([28.637446, -106.057549], {title: "Chihuahua, Chuhuahua, Mexico"});
  public myAddedMarkers: Marker[] = [];

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 16;

  public currentLatLng: LatLngExpression = [28.637446, -106.057549];

  //Define bounds fro longitude and latitude
  public southWest = latLng(-89.98155760646617, -180);
  public northEast = latLng(89.99346179538875, 180);
  public bounds = latLngBounds(this.southWest, this.northEast);

  ngAfterViewInit(): void {
    this.initMap();
    this.readFromLocalStorage();
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
    }).setView(this.currentLatLng, this.currentZoom);

    //Define traversable layer tiles
    const Layers = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.myMap);
    //add zoom control on the bottom left

    this.myMap.addControl(control.zoom({ position: 'topright' }));
    //Add a marker to map
    this.myMarker.addTo(this.myMap);


    const popupHtml = '<strong>My Marker</strong><br>Chihuahua, Chuhuahua, Mexico';

    // Bind popup to marker
    this.myMarker.bindPopup(popupHtml, {
      maxWidth: 250 // Optional: specify maximum width for the popup
    });

    // Open popup on marker
    this.myMarker.openPopup();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Hassan Abbbud'

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Fernando Herrera'

    // const marker = new Marker({
    //   // color: 'red',
    //   element: markerHtml
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );
  }

  generateAtCenter(){
    const currentLatLng = this.myMap!.getCenter();
    this.addMarker(currentLatLng);
  }

  addMarker(latLng: LatLngExpression) {
    //TODO: Add diferent colors to newly created markers
    //const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    if ( !this.myMap ) return;

    const addedMarker = marker(latLng, {draggable: true}).addTo(this.myMap)

    this.myAddedMarkers.push(addedMarker);
    // dragend

    this.saveToLocalStorage();
  }

  deleteMarker(index: number) {
    this.myAddedMarkers[index].remove()
    this.myAddedMarkers.splice(index, 1);
  }

  flyToMarker( currentMarker: Marker ){
    this.myMap?.flyTo(currentMarker.getLatLng(), 13)
  }

  saveToLocalStorage(){
    const savedMarkers: LatLngExpression[] = this.myAddedMarkers.map( marker  => {
      return marker.getLatLng();
    });

    localStorage.setItem('savedMarkers', JSON.stringify( savedMarkers ));
  }

  readFromLocalStorage(){
    // ?? means that if it doesn't arrive/doesn't exist it returns empty array []
    const savedMarkersString: string | null = localStorage.getItem("savedMarkers");
    const savedMarkers: LatLngExpression[] = savedMarkersString ? JSON.parse(savedMarkersString) : [];

    savedMarkers.forEach( savedMarker => {
      this.addMarker(savedMarker);
    })
  }

}
