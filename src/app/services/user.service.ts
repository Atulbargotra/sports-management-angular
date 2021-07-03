import { Injectable } from '@angular/core';
import { UserProfile } from '../Model/userProfile';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}
  updateUserProfile(userData: UserProfile): Observable<any> {
    return this.http.put(this.url + `/profile`, userData);
  }
}
