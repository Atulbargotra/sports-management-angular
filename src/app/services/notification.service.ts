import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationResponsePayload } from '../Model/notificationResponsePayload';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // url: string = 'http://localhost:8080/api/notifications/user';
  url: string = 'https://tiaasports.herokuapp.com/api/notifications/user';
  constructor(private http: HttpClient) {}
  
  getUserNotifications(
    cache = false
  ): Observable<Array<NotificationResponsePayload>> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<NotificationResponsePayload[]>(this.url, { headers });
  }
}
