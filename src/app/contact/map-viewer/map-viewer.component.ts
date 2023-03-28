import { Contact } from './../model/contact.model';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-googlemap',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],
})
export class MapViewerComponent implements OnInit, AfterViewInit {
  @Input() contact: Contact = new Contact();

  constructor(private _service: ContactService) {}

  ngOnInit(): void {}
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

  ngAfterViewInit(): void {
    let address = `${this.contact?.address} ${this.contact?.city} ${this.contact?.state} ${this.contact?.country} ${this.contact?.postalCode}`;

    this._service.getLatlong(address).subscribe(
      (x) => {
        this.markerPositions.push(x[0].geometry.location.toJSON());
      },
      (r) => console.log(r)
    );
  }
}
