import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {flatMap, map} from "rxjs/operators";
import {Ride} from "./ride";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private readonly SHEETS_API_URL: string = 'https://sheets.googleapis.com/v4/spreadsheets';
  private readonly DRIVE_API_URL: string = 'https://www.googleapis.com/drive/v3';
  private readonly RIDES_RANGE = 'rittenregistratie!A10:K';

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private ngZone: NgZone) {
  }

  getRides(sheetId: string): Observable<Ride[]> {
    return this.userService.getToken().pipe(flatMap(token => {
      return this.ngZone.run(() => {
        return this.httpClient.get<object>(this.SHEETS_API_URL + '/' + sheetId + '/values/' + this.RIDES_RANGE, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`
          })
        }).pipe(
          map(res => {
            console.log(res);
            let values = <any[]>res["values"];
            return values.map(value => {
              return {
                sheetId: sheetId,
                date: value[0],
                number: value[1],
                startOdoMeter: value[2],
                endOdoMeter: value[3],
                kilometers: value[4],
                fromAddress: value[5],
                toAddress: value[6],
                visitedAddress: value[8],
                route: value[7],
                type: value[9],
                remarks: value[10],
              };
            });
          })
        );
      });
    }))
  }

  saveRide(sheetId: string, ride: Ride): Observable<object> {
    return this.userService.getToken().pipe(flatMap(token => {
      return this.ngZone.run(() => {
        return this.httpClient.post<object>(this.SHEETS_API_URL + '/' + sheetId + '/values/' + this.RIDES_RANGE + ':append',
          {
            range: this.RIDES_RANGE,
            values: [[
              ride.date ? ride.date.toString() : "",
              ride.number ? ride.number.toString() : "",
              ride.startOdoMeter ? ride.startOdoMeter.toString() : "",
              ride.endOdoMeter ? ride.endOdoMeter.toString() : "",
              ride.kilometers ? ride.kilometers.toString() : "",
              ride.fromAddress ? ride.fromAddress.toString() : "",
              ride.toAddress ? ride.toAddress.toString() : "",
              ride.route ? ride.route.toString() : "",
              ride.visitedAddress ? ride.visitedAddress.toString() : "",
              ride.type ? ride.type.toString() : "",
              ride.remarks ? ride.remarks.toString() : ""
            ]]
          },
          {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`
            }),
            params: new HttpParams({
              fromObject: {
                valueInputOption: 'USER_ENTERED'
              }
            })
          });
      });
    }));
  }
}
