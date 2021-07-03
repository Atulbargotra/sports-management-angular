import { Injectable } from '@angular/core';
import { UserProfile } from '../Model/userProfile';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // url: string = 'http://localhost:8080/api/auth/user';
  url: string = 'https://tiaasports.herokuapp.com/api/auth/user';

  constructor(private http: HttpClient) {}
  updateUserProfile(userData: UserProfile): Observable<any> {
    return this.http.patch(this.url, userData);
  }
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.url);
  }
}
