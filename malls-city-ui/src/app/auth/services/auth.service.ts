import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIS, API_BASEURL } from 'src/app/constant/app.constant';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private logs: LoggerService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') ?? '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(formObj: any) {
    this.logs.info(`AuthSerive.ts::login:: ${JSON.stringify(formObj)}`);
    return this.http
      .post<any>(`${API_BASEURL}${APIS.ADMIN}${APIS.LOGIN}`, formObj)
      .pipe(
        map((user) => {
          this.logs.info(`AuthSerive.ts::user:: ${JSON.stringify(user)}`);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  signUp(formObj: any) {
    this.logs.info(`AuthSerive.ts::signUp:: ${JSON.stringify(formObj)}`);
    return this.http.post<any>(`${API_BASEURL}${APIS.ADMIN}`, formObj).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(`user:`, user);
        this.logs.info(`AuthSerive.ts::user:: ${JSON.stringify(user)}`);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
