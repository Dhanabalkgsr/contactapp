import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from './../../environments/environment';
import { ConatactService, Contact } from './model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService implements ConatactService {
  private apiUri: string = environment.apiurl;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();
  constructor(private _http: HttpClient) {}

  addcontact(contact: Contact): Observable<number> {
    return this._http.post<number>(`${this.apiUri}addcontact`, contact);
  }
  deletecontact(contactid: number): Observable<number> {
    return this._http.delete<number>(
      `${this.apiUri}deletecontact?contactId=${contactid}`
    );
  }
  getcontactbyid(contactid: number): Observable<Contact> {
    return this._http.get<Contact>(`${this.apiUri}getcontactbyid?id=${contactid}`);
  }
  getcontacts(): Observable<Contact[]> {
    return this._http.get<Contact[]>(`${this.apiUri}getcontacts`);
  }
  updatecontact(contact: Contact): Observable<number> {
    return this._http.put<number>(`${this.apiUri}updatecontact`, contact);
  }

  getLatlong(address: string): Observable<google.maps.GeocoderResult[]>{
      return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
          // Invokes geocode method of Google Maps API geocoding.
          this.geocoder.geocode({ address: address }, (
              (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                    if(results)
                      observer.next(results);
                      observer.complete();
                  } else {
                      console.log(
                          'Geocoding service: geocode was not successful for the following reason: '
                          + status
                      );
                      observer.error(status);
                  }
              })
          );
      });
  }
  }
