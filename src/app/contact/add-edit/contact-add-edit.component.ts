import { Contact } from './../model/contact.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css'],
})
export class ContactAddEditComponent implements OnInit {
  contactFrom!: FormGroup;
  Id: number = 0;
  IsSubmit: boolean = false;
  btnText: string = 'Save';

  constructor(
    private _router: Router,
    private _service: ContactService,
    private _routeparams: ActivatedRoute,
    private _fb: FormBuilder
  ) {}



  ngOnInit(): void {

    this.contactFrom = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
    });

    this._routeparams.params.subscribe((d) => {
      this.Id = +d['id'];
      if (this.Id  > 0) {
        this.btnText = 'Update';
      } else {
        this.btnText = 'Save';
        this.contactFrom.patchValue({firstName:'',lastName: '',email: '',phoneNumber: '',address: '',
         city: '',state:'',country:'',postalCode:''})
      }
    });

    if (this.Id > 0) {
      this._service.getcontactbyid(this.Id).subscribe((x) => {
      this.contactFrom.patchValue(x);
      });
    }
  }

  saveupdate() {
    this.IsSubmit = true;
    if (this.contactFrom.valid) {
      let data: Contact = new Contact();
      data = Object.assign({}, this.contactFrom.value);
      data.phoneNumber = data.phoneNumber.toString();
      data.postalCode = data.postalCode.toString();

      if (this.Id > 0) {
        data.contactId = this.Id;
        this._service
          .updatecontact(data)
          .subscribe((x) => this._router.navigateByUrl(''));
      } else
        this._service
          .addcontact(data)
          .subscribe((x) => this._router.navigateByUrl(''));
    }
  }
}
