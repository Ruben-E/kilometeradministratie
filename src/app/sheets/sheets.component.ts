import {Component, OnInit} from '@angular/core';
import {SheetService} from "../sheet.service";
import {Sheet} from "../sheet";


@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss']
})
export class SheetsComponent implements OnInit {

  sheets: Sheet[];

  constructor(private sheetService: SheetService) {
  }

  ngOnInit() {
    this.getSheets()
  }

  getSheets(): void {
    this.sheetService.getSheets()
      .subscribe(sheets => this.sheets = sheets);
  }

}
