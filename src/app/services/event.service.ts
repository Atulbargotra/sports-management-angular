import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EventRequestPayload } from '../Model/eventRequestPayload';
import { EventResponsePayload } from '../Model/eventResponsePayload';
import { FeedbackRequest } from '../Model/feedbackRequest';
import { FeedbackResponse } from '../Model/feedbackResponse';
import { ScheduleResponse } from '../Model/scheduleResponse';
import { TeamRequestPayload } from '../Model/teamRequestPayload';
import { UserRegistered } from '../Model/userRegistered';
import { winnersDetailsPayload } from '../Model/winnersDetailsPayload';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl = environment.baseUrl;
  url: string = this.baseUrl + 'api/events';

  constructor(private http: HttpClient) {}

  addEvent(event: EventRequestPayload): Observable<any> {
    return this.http.post(this.url, event);
  }
  saveDraft(event: EventRequestPayload): Observable<any> {
    return this.http.post(this.url + `/draft`, event);
  }
  editDraft(id: number, event: EventRequestPayload): Observable<any> {
    return this.http.put(this.url + `/edit/${id}`, event);
  }
  getEventDrafts(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/draft`);
  }
  getAllEvents(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url);
  }
  getEventsByTime(time: string): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/time/${time}`);
  }
  getEventsByCategory(
    category: string
  ): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(
      this.url + `/category/${category}`
    );
  }
  getEventsByVenue(venue: string): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/venue/${venue}`);
  }
  getEventByType(type: string): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/type/${type}`);
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
  publishDraftEvent(id: number): Observable<any> {
    return this.http.get(this.url + `/draft/publish/${id}`);
  }
  getExpiredEvents(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/expired`);
  }
  getRegisteredEvents(
    isClosed: string
  ): Observable<Array<EventResponsePayload>> {
    let eventClosed = false;
    if (isClosed === 'closed') {
      eventClosed = true;
    }
    return this.http.get<EventResponsePayload[]>(
      this.url + `/me?closed=${eventClosed}`
    );
  }
  register(id: number): Observable<any> {
    return this.http.put(this.url + `/${id}/register`, {});
  }
  unregister(id: number) {
    return this.http.delete(this.url + `/${id}/leave`);
  }
  registerAsTeam(id: number, team: TeamRequestPayload): Observable<any> {
    return this.http.put<any>(this.url + `/${id}/register/team`, team);
  }
  getEventById(id: number): Observable<EventResponsePayload> {
    return this.http.get<EventResponsePayload>(this.url + `/${id}`);
  }
  getEventsAndWinners(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/winners`);
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
  postFeedback(id: number, feedback: FeedbackRequest) {
    return this.http.post(this.url + `/${id}/feedback`, feedback);
  }
  getAllFeedbacks(id: number): Observable<FeedbackResponse> {
    return this.http.get<FeedbackResponse>(this.url + `/${id}/feedback`);
  }
  getAllEventsExpired(): Observable<Array<EventResponsePayload>> {
    return this.http.get<EventResponsePayload[]>(this.url + `/eventsexpired`);
  }
}
