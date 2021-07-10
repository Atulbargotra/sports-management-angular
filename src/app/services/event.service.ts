import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRequestPayload } from '../Model/eventRequestPayload';
import { EventResponsePayload } from '../Model/eventResponsePayload';
import { ScheduleResponse } from '../Model/scheduleResponse';
import { TeamRequestPayload } from '../Model/teamRequestPayload';
import { UserRegistered } from '../Model/userRegistered';
import { winnersDetailsPayload } from '../Model/winnersDetailsPayload';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // url: string = 'http://localhost:8080/api/events';
  url: string = 'https://tiaasports.herokuapp.com/api/events';

  constructor(private http: HttpClient) {}

  addEvent(event: EventRequestPayload): Observable<any> {
    return this.http.post(this.url, event);
  }
  saveDraft(event: EventRequestPayload): Observable<any> {
    return this.http.post(this.url + `/draft`, event);
  }
  editDraft(id: number, event: EventRequestPayload): Observable<any> {
    return this.http.put(this.url + `/draft/edit/${id}`, event);
  }
  getEventDrafts(cache = false): Observable<Array<EventResponsePayload>> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<EventResponsePayload[]>(this.url + `/draft`, {
      headers,
    });
  }
  getAllEvents(
    filter: string,
    cache = false
  ): Observable<Array<EventResponsePayload>> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<EventResponsePayload[]>(
      this.url + `?filter=${filter}`,
      { headers }
    );
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }

  postWinnnerDetails(
    id: number,
    winnersDetails: winnersDetailsPayload
  ): Observable<any> {
    return this.http.post(this.url + `/${id}/winners`, winnersDetails);
  }
  getWinners(id: number, cache = false): Observable<winnersDetailsPayload> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<winnersDetailsPayload>(this.url + `/${id}/winners`, {
      headers,
    });
  }
  publishDraftEvent(id: number): Observable<any> {
    return this.http.get(this.url + `/draft/publish/${id}`);
  }
  getExpiredEvents(cache = false): Observable<Array<EventResponsePayload>> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<EventResponsePayload[]>(this.url + `/expired`, {
      headers,
    });
  }
  getRegisteredEvents(cache = false): Observable<Array<EventResponsePayload>> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<EventResponsePayload[]>(this.url + `/me`, { headers });
  }
  register(id: number): Observable<any> {
    return this.http.put(this.url + `/${id}/register`, {});
  }
  registerAsTeam(id: number, team: TeamRequestPayload): Observable<any> {
    return this.http.put<any>(this.url + `/${id}/register/team`, team);
  }
  getEventById(id: number, cache = false): Observable<EventResponsePayload> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<EventResponsePayload>(this.url + `/${id}`, {
      headers,
    });
  }
  getEventsAndWinners(cache = false): Observable<Array<EventResponsePayload>> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<EventResponsePayload[]>(this.url + `/winners`, {
      headers,
    });
  }
  getPublishedEvents(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/published`);
  }
  getUsersRegisteredInEvent(id: number): Observable<Array<UserRegistered>> {
    return this.http.get<UserRegistered[]>(this.url + `/${id}/registered`);
  }
  schedule(id: number, method: string): Observable<ScheduleResponse> {
    console.log('ininni');
    return this.http.get<ScheduleResponse>(
      this.url + `/${id}/schedule/draft?method=${method}`
    );
  }
  publishSchedule(id: number, method: string): Observable<boolean> {
    return this.http.put<boolean>(
      this.url + `/${id}/schedule/publish?method=${method}`,
      {}
    );
  }
  getSchedule(id: number): Observable<ScheduleResponse> {
    return this.http.get<ScheduleResponse>(this.url + `/${id}/schedule`);
  }
}
