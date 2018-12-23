import {Component, NgZone, OnInit} from '@angular/core';
import {SheetService} from "../sheet.service";
import {Sheet} from "../sheet";
import {UserService} from "../user.service";


@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss']
})
export class SheetsComponent implements OnInit {

  signedIn: boolean = false;
  sheets: Sheet[];
  sheetsLoading: boolean = true;

  constructor(private sheetService: SheetService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.isLoggedIn();
  }

  getSheets(): void {
    this.sheetsLoading = true;
    this.sheetService.getSheets()
      .subscribe(sheets => {
        this.sheets = sheets;
        this.sheetsLoading = false;
      });
  }

  isLoggedIn() {
    this.userService.isUserSignedIn().subscribe(signedIn => {
      this.signedIn = signedIn;

      if (signedIn) {
        this.getSheets();
      }
    })
  }

}
