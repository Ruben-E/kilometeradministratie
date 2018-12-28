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
import { LogRideComponent } from './log-ride/log-ride.component';
import { RidesOverviewComponent } from './rides-overview/rides-overview.component';
import { PresetPickerComponent } from './preset-picker/preset-picker.component';

let clientId = "912411441317-nj1lc9j2ev1sk9asmp1fihi302r3mn75.apps.googleusercontent.com";
let gapiClientConfig: NgGapiClientConfig = {
  client_id: clientId,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  ux_mode: "redirect",

  scope: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    RidesComponent,
    SheetsComponent,
    LogRideComponent,
    RidesOverviewComponent,
    PresetPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
