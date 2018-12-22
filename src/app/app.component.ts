import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {GoogleApiService, GoogleAuthService} from "ng-gapi";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kilometeradministratie';

  constructor(private userService: UserService,
              private authService: GoogleAuthService,
              private gapiService: GoogleApiService) {
    // First make sure gapi is loaded can be in AppInitilizer
    this.gapiService.onLoad().subscribe();

  }

  ngOnInit() {
      this.signIn();
  }

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  public signIn() {
      this.authService.getAuth().subscribe((auth) => {
        if (!this.isLoggedIn() || !auth.isSignedIn.get()) {
          this.userService.signIn()
        }
     })
  }
}
