import {Injectable} from '@angular/core';
import {Sheet} from "./sheet";
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private readonly SHEETS_API_URL: string = 'https://sheets.googleapis.com/v4/spreadsheets';
  private readonly DRIVE_API_URL: string = 'https://www.googleapis.com/drive/v3';

  constructor(private httpClient: HttpClient) {
  }

  getSheets(token: string): Observable<Sheet[]> {
    return this.httpClient.get(this.DRIVE_API_URL + '/files', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
      params: new HttpParams({
        fromObject: {
          q: "mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false",
          pageSize: "1000",
        }
      })
    }).pipe(
      map(res => {
        return res["files"];
      })
    );
  }

  getSheet(token: string, sheetId: string): Observable<Sheet> {
    return this.httpClient.get(this.SHEETS_API_URL + '/' + sheetId, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(res => {
        return {
          id: res['spreadsheetId'],
          name: res['properties']['title']
        };
      })
    );
  }
}
