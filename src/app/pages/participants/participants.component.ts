import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamDetailsPayload } from '../../Model/teamDetailsPayload';
import { EventResponsePayload } from '../../Model/eventResponsePayload';
import { UserRegistered } from '../../Model/userRegistered';
import { MatchResponse } from 'src/app/Model/matchResponse';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
})
export class ParticipantsComponent implements OnInit {
  type: string;
  name: string;
  selectedMethod: string;
  matchesAvailable: boolean = false;
  matches: MatchResponse[];
  notScheduled: boolean = true;
  constructor(
    private teamService: TeamService,
    private eventService: EventService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  registeredTeams: TeamDetailsPayload[];
  registeredUsers: UserRegistered[];
  event: EventResponsePayload;
  pid: number;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.pid = +res.get('id');
    });
    this.event = history.state;
    console.log(this.event);
    if (this.event.type === 'TEAM') {
      this.handleGetTeamsByEventID(this.pid);
    } else {
      this.handleGetUserByEventId(this.pid);
    }
  }

  handleGetEventById(id: number) {
    this.eventService.getEventById(id).subscribe(
      (getRes) => {
        this.event = getRes;
      },
      (error) => {
        this.toast.error('Problem Occured to get Event details by ID');
        console.log(error);
      }
    );
  }

  handleGetTeamsByEventID(id: number) {
    console.log('ininin');
    this.teamService.geTeamsByEventId(id).subscribe(
      (res) => {
        this.registeredTeams = res;
      },
      (error) => {
        this.toast.error('Problem occured to get Registered Teams By ID');
        console.log(error);
      }
    );
  }

  handleGetUserByEventId(id: number) {
    this.eventService.getUsersRegisteredInEvent(id).subscribe(
      (res) => {
        this.registeredUsers = res;
        this.registeredUsers.map((user) =>
          user.picture === null
            ? (user.picture =
                'https://img.icons8.com/color/48/000000/user-male-circle--v1.png')
            : user.picture
        );
      },
      (error) => {
        this.toast.error('Problem occured to get Registered Users By ID');
        console.log(error);
      }
    );
  }
  schedule() {
    this.eventService
      .schedule(this.pid, this.selectedMethod)
      .subscribe((data) => {
        if (data.matches.length > 0) {
          this.matches = data.matches;
          this.matchesAvailable = true;
        }
      });
  }
  publish() {
    this.eventService.publishSchedule(this.pid, this.selectedMethod).subscribe(
      (data) => {
        this.notScheduled = false;
        this.toast.success('Schedule Published');
      },
      (error) => {
        this.toast.error('Failed');
      }
    );
  }
}
