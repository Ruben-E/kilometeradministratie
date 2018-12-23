import {Component, Input, OnInit} from '@angular/core';
import {Ride} from "../ride";

@Component({
  selector: 'app-rides-overview',
  templateUrl: './rides-overview.component.html',
  styleUrls: ['./rides-overview.component.scss']
})
export class RidesOverviewComponent implements OnInit {
  @Input() rides: Ride[];

  constructor() { }

  ngOnInit() {
  }

}
