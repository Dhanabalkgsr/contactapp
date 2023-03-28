import { Router } from '@angular/router';
import { ContactService } from './../contact.service';
import { Component, OnInit } from "@angular/core";
import { Contact } from "../model/contact.model";

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
  })
  export class ContactListComponent implements OnInit{
   contactList: Contact[] = [];
   isShowMap: boolean = false;
   selectedContact: Contact = new Contact();

   constructor(private _service: ContactService,private _router: Router) {

   }

   ngOnInit(): void {
    this.loadData();
   }

   loadData() {
    this._service.getcontacts().subscribe(x=> {this.contactList = x; console.log(x); });

   }

   edit(id: number){
    this._router.navigateByUrl(`/addedit/${id}`)
   }
   deletes(id:number){
    this._service.deletecontact(id).subscribe(x=> this.loadData());
   }

   viewmap(c: Contact){

    this.selectedContact = c;
    this.isShowMap = true;
   }
  }
