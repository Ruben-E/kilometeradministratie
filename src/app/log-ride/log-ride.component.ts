import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Ride} from "../ride";
import * as dayjs from 'dayjs';
import {RideService} from "../ride.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-log-ride',
  templateUrl: './log-ride.component.html',
  styleUrls: ['./log-ride.component.scss']
})
export class LogRideComponent implements OnChanges, OnInit {

  @Input() rides: Ride[];
  @Input() sheetId: string;
  @Output() logged = new EventEmitter<Ride>();

  newRide: Ride = this.defaultRide();
  differentRoute: boolean = false;

  constructor(private rideService: RideService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  defaultRide() {
    return {
      sheetId: this.sheetId,
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

  onSubmit() {
      this.newRide.number = this.rides.filter(ride => dayjs(ride.date).isSame(dayjs(this.newRide.date))).length + 1;
      this.newRide.kilometers = this.newRide.endOdoMeter - this.newRide.startOdoMeter;
      this.rideService.saveRide(this.sheetId, this.newRide).subscribe(_ => {
        this.logged.emit(this.newRide);
        this.newRide = this.defaultRide();
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    const ridesChange: SimpleChange = changes.rides;
    const newRides = <Ride[]>ridesChange.currentValue;
    if (newRides && newRides.length > 0 && newRides[0].endOdoMeter) {
      this.newRide.startOdoMeter = newRides[0].endOdoMeter;
    }
  }
}
