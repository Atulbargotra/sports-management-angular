import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamDetailsPayload } from '../Model/teamDetailsPayload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  url: string = 'http://localhost:8080/api/teams';
  // url: string = 'https://tiaasports.herokuapp.com/api/teams';

  constructor(private http: HttpClient) {}

  createTeam(team: TeamDetailsPayload): Observable<any> {
    return this.http.post(this.url, team);
  }
  getTeamMembersById(id: number): Observable<any> {
    return this.http.get(this.url + `/${id}`);
  }
  joinTeam(id: number): Observable<any> {
    return this.http.put(this.url + `/{id}`, {});
  }
  geTeamsByEventId(id: number): Observable<Array<TeamDetailsPayload>> {
    return this.http.get<TeamDetailsPayload[]>(this.url + `?eventId=${id}`);
  }
  deleteTeam(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }
  getMyTeams(): Observable<Array<TeamDetailsPayload>> {
    return this.http.get<TeamDetailsPayload[]>(this.url + `/me`);
  }
}
