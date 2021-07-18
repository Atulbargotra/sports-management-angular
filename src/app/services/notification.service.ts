import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotificationResponsePayload } from '../Model/notificationResponsePayload';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  baseUrl = environment.baseUrl;

  url: string = 'api/notifications/user';
  constructor(private http: HttpClient) {}

  getUserNotifications(): Observable<Array<NotificationResponsePayload>> {
    return this.http.get<NotificationResponsePayload[]>(this.url);
  }
  getUserNotificationsCount(): Observable<number> {
    return this.http.get<number>(this.url + `/count`);
  }
  deleteNotification(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + `/${id}`);
  }
}
