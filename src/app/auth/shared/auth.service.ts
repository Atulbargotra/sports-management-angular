import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { SigninRequestPayload } from '../signin/signin-request.payload';
import { SigninResponse } from '../signin/signin-response.payload';
import { SignupRequestPayload } from '../signup/signup-request-payload';
import { map, tap } from 'rxjs/operators';
import { AdminSignupRequestPayload } from '../signup/admin-signup-request-payload';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  url: string = 'http://localhost:8080/api/auth';
  // url: string = 'https://tiaasports.herokuapp.com/api/auth';
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.isLoggedIn()) {
      this.router.navigate([''], { queryParams: { returnUrl: state.url } });
    }
    return true;
  }
  userSignup(signupRequestPayload: SignupRequestPayload) {
    return this.httpClient.post(this.url + '/signup', signupRequestPayload, {
      responseType: 'text',
    });
  }

  adminSignup(adminSignupRequestPayload: AdminSignupRequestPayload) {
    return this.httpClient.post(
      this.url + '/signup/admin',
      adminSignupRequestPayload,
      {
        responseType: 'text',
      }
    );
  }
  login(loginRequestPayload: SigninRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<SigninResponse>(this.url + '/login', loginRequestPayload)
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.localStorage.store('type', data.type);
          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient
      .post<SigninResponse>(
        this.url + '/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
          this.localStorage.store('type', response.type);
        })
      );
  }

  logout() {
    this.httpClient
      .post(this.url + '/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('type');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
  getUserType() {
    return this.localStorage.retrieve('type');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
