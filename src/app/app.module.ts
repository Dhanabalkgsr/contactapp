import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact/list/contact-list.component';
import { ContactAddEditComponent } from './contact/add-edit/contact-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './contact/contact.service';
import { ContactInterceptor } from './app.interceptor.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapViewerComponent } from './contact/map-viewer/map-viewer.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactAddEditComponent,
    MapViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    HttpClientModule,
    InputNumberModule,
    GoogleMapsModule,
    DialogModule
  ],
  providers: [ContactService,{ provide: HTTP_INTERCEPTORS, useClass: ContactInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
