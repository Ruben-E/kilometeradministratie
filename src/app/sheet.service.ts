import {Injectable} from '@angular/core';
import {SHEETS} from './mock-sheets';
import {Sheet} from "./sheet";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor() {
  }

  getSheets(): Observable<Sheet[]> {
    return of(SHEETS);
  }
}
