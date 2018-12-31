import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Ride} from "../ride";
import * as dayjs from 'dayjs';
import {RideService} from "../ride.service";
import {Preset} from "../preset";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-log-ride',
  templateUrl: './log-ride.component.html',
  styleUrls: ['./log-ride.component.scss']
})
export class LogRideComponent implements OnChanges, OnInit {

  @Input() rides: Ride[];
  @Input() sheetId: string;
  @Output() logged = new EventEmitter<Ride>();

  newRide: Ride;
  loading: boolean = false;
  error: boolean = false;


  constructor(private rideService: RideService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.newRide = this.defaultRide();
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
      type: 'Zakelijk',
      remarks: ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.newRide.number = this.rides.filter(ride => dayjs(ride.date).isSame(dayjs(this.newRide.date))).length + 1;
      this.newRide.kilometers = this.newRide.endOdoMeter - this.newRide.startOdoMeter;
      this.loading = true;
      this.error = false;
      this.rideService.saveRide(this.sheetId, this.newRide).subscribe(
        _ => {
          this.loading = false;
          form.resetForm();
          this.changeDetector.detectChanges();
          this.newRide = {...this.newRide, ...this.defaultRide()};
          this.logged.emit(this.newRide);
        },
        error => {
          this.loading = false;
          this.error = true;
        }
      )
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const ridesChange: SimpleChange = changes.rides;
    const newRides = <Ride[]>ridesChange.currentValue;
    if (this.newRide && newRides && newRides.length > 0 && newRides[0].endOdoMeter) {
      this.newRide.startOdoMeter = newRides[0].endOdoMeter;
    }
  }

  presetSelected(preset: Preset) {
    this.newRide.fromAddress = preset.fromAddress;
    this.newRide.toAddress = preset.toAddress;
    this.newRide.visitedAddress = preset.visitedAddress;
    this.newRide.type = preset.type;
    this.newRide.remarks = preset.remarks;
    this.newRide.route = preset.route;
  }
}
