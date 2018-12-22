import {Component, OnInit} from '@angular/core';
import {SheetService} from "../sheet.service";
import {Sheet} from "../sheet";
import {UserService} from "../user.service";


@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss']
})
export class SheetsComponent implements OnInit {

  sheets: Sheet[];
  sheetsLoading: boolean = true;

  constructor(private sheetService: SheetService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getSheets()
  }

  getSheets(): void {
    this.sheetsLoading = true;
    this.sheetService.getSheets(this.userService.getToken())
      .subscribe(sheets => {
        this.sheets = sheets;
        this.sheetsLoading = false;
      });
  }

  isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

}
