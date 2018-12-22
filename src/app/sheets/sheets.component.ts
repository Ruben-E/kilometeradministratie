import {Component, OnInit} from '@angular/core';
import {SHEETS} from '../mock-sheets';
import {Sheet} from "../sheet";

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss']
})
export class SheetsComponent implements OnInit {

  sheets = SHEETS;
  selectedSheet: Sheet;

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(sheet: Sheet): void {
    this.selectedSheet = sheet;
  }

}
