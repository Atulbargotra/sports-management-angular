import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRequestPayload } from '../Model/eventRequestPayload';
import { EventResponsePayload } from '../Model/eventResponsePayload';
import { TeamRequestPayload } from '../Model/teamRequestPayload';
import { winnersDetailsPayload } from '../Model/winnersDetailsPayload';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  url: string = 'http://localhost:8080/api/events';
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
  getEventDrafts(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/draft`);
  }
  getAllEvents(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url);
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
  getWinners(id: number): Observable<winnersDetailsPayload> {
    return this.http.get<winnersDetailsPayload>(this.url + `/${id}/winners`);
  }
  deleteDraft(id: number): Observable<any> {
    return this.http.delete(this.url + `/draft/${id}`);
  }
  publishDraftEvent(id: number): Observable<any> {
    return this.http.get(this.url + `/draft/publish/${id}`);
  }
  getExpiredEvents(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/expired`);
  }
  getRegisteredEvents(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/me`);
  }
  register(id: number): Observable<any> {
    return this.http.put(this.url + `/${id}/register`, {});
  }
  registerAsTeam(id: number, team: TeamRequestPayload): Observable<any> {
    return this.http.put(this.url + `/${id}/register/team`, team);
  }
  getEventById(id: number): Observable<EventResponsePayload> {
    return this.http.get<EventResponsePayload>(this.url + `/${id}`);
  }
}
