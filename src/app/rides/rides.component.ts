import {Component, OnInit, Input} from '@angular/core';
import {Sheet} from '../sheet';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})

export class RidesComponent implements OnInit {
  @Input() sheet: Sheet;

  constructor() {
  }

  ngOnInit() {
  }

}
