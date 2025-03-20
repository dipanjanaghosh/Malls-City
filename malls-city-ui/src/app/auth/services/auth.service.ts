import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIS, API_BASEURL } from 'src/app/constant/app.constant';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { AdminUser } from '../modal/authInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken'; // Key to store the token
  private userKey = 'currentUser'; // Key to store the user data
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<AdminUser>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private logs: LoggerService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUser());
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
          this.setToken(user.token);
          this.setUser(user);
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
        this.setToken(user.token);
        this.setUser(user);
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    this.removeToken();
    this.removeUser();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const currentUserString = this.getUser();
    if (!currentUserString) {
      console.log('Authentication failed: User not found');
      return false;
    }
    try {
      const currentUser = JSON.parse(currentUserString);
      if (!currentUser || !currentUser.token) {
        console.log('Authentication failed: currentUser or token is missing');
        return false;
      }

      const isTokenExpired = this.jwtHelper.isTokenExpired(currentUser.token);
      if (isTokenExpired) {
        console.log('Authentication failed: token expired');
        return false;
      }

      return true; // Token exists and is not expired
    } catch (error) {
      console.error('Error parsing currentUser:', error);
      return false; // Handle parsing errors
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUser(userData: AdminUser): void {
    localStorage.setItem(this.userKey, JSON.stringify(userData));
  }

  getUser(): string | null {
    return JSON.parse(localStorage.getItem(this.userKey) ?? '{}');
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
