import {Component, NgZone, OnInit} from '@angular/core';
import {Sheet} from '../sheet';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {RideService} from "../ride.service";
import {SheetService} from "../sheet.service";
import {Ride} from "../ride";
import {UserService} from "../user.service";

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private sheetService: SheetService
  ) {
  }

  rides: Ride[];
  ridesLoading: boolean = true;

  sheet: Sheet;
  sheetLoading: boolean = true;

  ngOnInit(): void {
    this.getRides();
    this.getSheet();
  }

  getSheet(): void {
    this.sheetLoading = true;
    this.sheetService.getSheet(this.getSheetId())
      .subscribe(sheet => {
        this.sheet = sheet;
        this.sheetLoading = false;
      });
  }

  getRides(): void {
    this.ridesLoading = true;
    this.rideService.getRides(this.getSheetId())
      .subscribe(rides => {
        this.rides = rides.reverse();
        this.ridesLoading = false;
      });
  }

  getSheetId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  rideLogged(ride: Ride) {
    this.getRides();
  }
}
