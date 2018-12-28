import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {GoogleApiService, GoogleAuthService} from "ng-gapi";
import {Observable} from "rxjs";
import {Route} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kilometeradministratie';
  signedIn = false;
  userName = '';
  userImage = '';

  constructor(private userService: UserService,
              private authService: GoogleAuthService,
              private gapiService: GoogleApiService) {
    // First make sure gapi is loaded can be in AppInitilizer
    this.gapiService.onLoad().subscribe();

  }

  ngOnInit() {
    this.isSignedIn();

    this.userService.listenForSigninStatus().subscribe(signedIn => {
      console.log(signedIn);
      window.location.reload();
    })
  }

  isSignedIn() {
    this.userService.isUserSignedIn().subscribe(signedIn => {
      this.signedIn = signedIn;
      if (signedIn) {
        this.userService.getCurrentUser().subscribe(user => {
          this.userName = user.getBasicProfile().getName();
          this.userImage = user.getBasicProfile().getImageUrl();
        });
      }
    })
  }

  signIn() {
    this.userService.signIn();
  }

  signOut() {
    this.userService.signOut();
  }
}
