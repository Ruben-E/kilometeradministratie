import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RidesComponent} from './rides/rides.component';
import {SheetsComponent} from './sheets/sheets.component';
import {FormsModule} from "@angular/forms";
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from "ng-gapi";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {FlexLayoutModule} from "@angular/flex-layout";

let clientId = "";
let gapiClientConfig: NgGapiClientConfig = {
  client_id: clientId,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  // ux_mode: "redirect",
  scope: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    RidesComponent,
    SheetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
