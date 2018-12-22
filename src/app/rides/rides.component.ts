import {Component, OnInit, Input} from '@angular/core';
import {Sheet} from '../sheet';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {RideService} from "../ride.service";
import {Ride} from "../ride";

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})

export class RidesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService,
    private location: Location
  ) {}

  rides: Ride[];

  ngOnInit(): void {
    this.getRides();
  }

  getRides(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.rideService.getRides(id)
      .subscribe(rides => this.rides = rides);
  }

}
