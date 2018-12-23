import {Injectable, NgZone} from '@angular/core';
import {GoogleAuthService} from "ng-gapi";
import GoogleUser = gapi.auth2.GoogleUser;
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private googleAuthService: GoogleAuthService,
              private ngZone: NgZone) {

  }

  public getCurrentUser(): Observable<GoogleUser> {
    return Observable.create(observer => {
      this.googleAuthService.getAuth().subscribe(auth => {
          this.ngZone.run(() => {
            if (auth.currentUser.get()) {
              observer.next(auth.currentUser.get())
            } else {
              observer.next(null)
            }
          })
        }
      )
    });
  }

  public getToken(): Observable<string> {
    return Observable.create(observer => {
      this.googleAuthService.getAuth().subscribe(auth => {
          this.ngZone.run(() => {
            if (auth.currentUser.get().isSignedIn()) {
              observer.next(auth.currentUser.get().getAuthResponse().access_token)
            } else {
              observer.next(null)
            }
          })
        }
      )
    });
  }

  public listenForSigninStatus(): Observable<boolean> {
    return Observable.create(observer => {
      this.googleAuthService.getAuth().subscribe(auth => {
          auth.isSignedIn.listen(signedIn => {
            this.ngZone.run(() => {
              observer.next(signedIn);
            });
          });
        }
      )
    });
  }

  public signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
    });
  }

  //TODO: Rework
  public signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      try {
        auth.signOut();
      } catch (e) {
        console.error(e);
      }
    });
  }

  public isUserSignedIn(): Observable<boolean> {
    return Observable.create(observer => {
      this.getToken().subscribe(token => {
          this.ngZone.run(() => {
            observer.next(token != null)
          })
        }
      )
    });
  }

  private signInSuccessHandler(res: GoogleUser) {

  }

  private signInErrorHandler(err) {
    console.warn(err);
  }
}
