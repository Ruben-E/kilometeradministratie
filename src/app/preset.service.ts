import {Injectable, NgZone} from '@angular/core';
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {Preset} from "./preset";

@Injectable({
  providedIn: 'root'
})
export class PresetService {
  private readonly SHEETS_API_URL: string = 'https://sheets.googleapis.com/v4/spreadsheets';
  private readonly RIDES_RANGE = 'adressen!A2:K';

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private ngZone: NgZone) { }

  getPresets(sheetId: string): Observable<Preset[]> {
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
                fromAddress: value[0],
                fromAlias: value[1],
                toAddress: value[2],
                toAlias: value[3],
                route: value[4],
                visitedAddress: value[5],
                type: value[6],
                remarks: value[7],
              };
            });
          })
        );
      });
    }))
  }

}
