import { Observable } from 'rxjs';

export class Contact {
  contactId?: number;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  postalCode: string = '';
}

export interface ConatactService {
  addcontact(contact: Contact): Observable<number>;
  deletecontact(contactid: number): Observable<number>;
  getcontactbyid(contactid: number): Observable<Contact>;
  getcontacts(): Observable<Contact[]>;
  updatecontact(contact: Contact): Observable<number>;
}
