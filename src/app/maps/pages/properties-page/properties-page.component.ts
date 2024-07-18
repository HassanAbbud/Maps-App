import { Component } from '@angular/core';

interface House {
  title: string;
  description: string;
  latLng: [number, number];
}

@Component({
  selector: 'maps-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {
  public houses: House[] = [
    {
      title: 'Residential House, Canada',
      description: 'Beautiful property in  Katana, Canada',
      latLng: [ 45.280015511264466, -75.92722289474008]
    },
    {
      title: 'Beach House, Mexico',
      description: 'Breathtaking house in Acapulco, México',
      latLng: [ 16.828940930185748, -99.91287720907991]
    },
    {
      title: 'Apartment, Argentina',
      description: 'Luxurious apartment in the heart of Buenos Aires, Argentina',
      latLng: [ -34.57150108832866, -58.430166677283445 ]
    },
    {
      title: 'Commercial local, España',
      description: 'Local in Madrid, España, near El Jardín Secreto.',
      latLng: [ 40.42567285425766, -3.7112735618380177 ]
    },
  ]
}
