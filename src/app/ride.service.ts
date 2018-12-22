import {Injectable} from '@angular/core';
import {of} from "rxjs";
import {RIDES} from "./mock-rides";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor() {
  }

  getRides(sheetId: string) {
    return of(RIDES.filter(ride => ride.sheetId === sheetId));
  }
}
