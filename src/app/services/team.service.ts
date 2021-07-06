import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getTeamMembersById(id: number, cache = false): Observable<any> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get(this.url + `/${id}`, { headers });
  }
  joinTeam(teamId: number, eventId: number): Observable<any> {
    return this.http.put(
      this.url + `/${teamId}/request?eventId=${eventId}`,
      {}
    );
  }
  geTeamsByEventId(
    id: number,
    cache = false
  ): Observable<Array<TeamDetailsPayload>> {
    let headers: HttpHeaders;
    if (cache) {
      headers = new HttpHeaders({ 'cache-response': 'true' });
    }
    return this.http.get<TeamDetailsPayload[]>(this.url + `?eventId=${id}`, {
      headers,
    });
  }
  deleteTeam(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }
  getMyTeams(): Observable<Array<TeamDetailsPayload>> {
    return this.http.get<TeamDetailsPayload[]>(this.url + `/me`);
  }
}
