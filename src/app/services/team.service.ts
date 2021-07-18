import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamDetailsPayload } from '../Model/teamDetailsPayload';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  baseUrl = environment.baseUrl;

  url: string = this.baseUrl + 'api/teams';

  constructor(private http: HttpClient) {}

  createTeam(team: TeamDetailsPayload): Observable<any> {
    return this.http.post(this.url, team);
  }
  getTeamMembersById(id: number): Observable<any> {
    return this.http.get(this.url + `/${id}`);
  }
  joinTeam(teamId: number, eventId: number): Observable<any> {
    return this.http.put(
      this.url + `/${teamId}/request?eventId=${eventId}`,
      {}
    );
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
  joinTeamFromInvite(token: string) {
    return this.http.put(this.url + `/invite?token=${token}`, {});
  }
}
