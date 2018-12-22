import {Component, OnInit} from '@angular/core';
import {Sheet} from '../sheet';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {RideService} from "../ride.service";
import {SheetService} from "../sheet.service";
import {Ride} from "../ride";
import {UserService} from "../user.service";
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private userService: UserService,
    private sheetService: SheetService,
    private location: Location
  ) {
  }

  rides: Ride[];
  ridesLoading: boolean = true;

  newRide: Ride = this.defaultRide();

  sheet: Sheet;
  sheetLoading: boolean = true;

  ngOnInit(): void {
    this.getRides();
    this.getSheet();
  }

  onSubmit() {
    this.newRide.number = this.rides.filter(ride => dayjs(ride.date).isSame(dayjs(this.newRide.date))).length + 1;
    this.rideService.saveRide(this.userService.getToken(), this.getSheetId(), this.newRide).subscribe(a => {
      this.newRide = this.defaultRide();
      this.getRides();
    })
  }

  defaultRide() {
    return {
      sheetId: this.getSheetId(),
      date: dayjs().format('YYYY-MM-DD'),
      number: null,
      startOdoMeter: 0,
      endOdoMeter: null,
      kilometers: null,
      fromAddress: '',
      toAddress: '',
      visitedAddress: '',
      route: '',
      type: '',
      remarks: ''
    }
  }

  getSheet(): void {
    this.sheetLoading = true;
    this.sheetService.getSheet(this.userService.getToken(), this.getSheetId())
      .subscribe(sheet => {
        this.sheet = sheet;
        this.sheetLoading = false;
      });
  }

  getRides(): void {
    this.ridesLoading = true;
    this.rideService.getRides(this.userService.getToken(), this.getSheetId())
      .subscribe(rides => {
        this.rides = rides.reverse();
        if (this.rides.length > 0 && this.rides[0].endOdoMeter) {
          this.newRide.startOdoMeter = this.rides[0].endOdoMeter;
        }
        this.ridesLoading = false;
      });
  }

  getSheetId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }
}
