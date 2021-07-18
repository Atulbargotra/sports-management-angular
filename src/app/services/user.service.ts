import { Injectable } from '@angular/core';
import { UserProfile } from '../Model/userProfile';
import { Observable, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { basename } from 'path';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;

  url: string = this.baseUrl + 'api/auth/user';

  constructor(private http: HttpClient) {}
  updateUserProfile(userData: UserProfile): Observable<any> {
    return this.http.patch(this.url, userData);
  }
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.url);
  }
}
