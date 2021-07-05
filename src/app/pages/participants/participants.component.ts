import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { TeamService } from 'src/app/services/team.service';
import {TeamDetailsPayload} from '../../Model/teamDetailsPayload'
import {EventResponsePayload} from '../../Model/eventResponsePayload'
import {UserRegistered} from '../../Model/userRegistered'


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  constructor(
    private teamService:TeamService,
    private eventService:EventService,
    private toast:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }

  registeredTeams:TeamDetailsPayload[];
  registeredUsers:UserRegistered[];
  event:EventResponsePayload;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res=>{
      let pid = +res.get('id');
      console.log(pid);
      this.handleGetEventById(pid)
      this.handleGetTeamsByEventID(pid)
      this.handleGetUserByEventId(pid)

    })
  }

  handleGetEventById(id: number) {
    this.eventService.getEventById(id).subscribe(
      (getRes) => {
        this.event = getRes;
        console.log("Event details by ID : "+this.event)
      },
      (error) => {
        this.toast.error('Problem Occured to get Event details by ID');
        console.log(error);
      }
    );
  }

  handleGetTeamsByEventID(id:number){
    console.log("Teams")
    this.teamService.geTeamsByEventId(id).subscribe(res=>{
      this.registeredTeams = res;
      console.log("Registered Teams by Id : "+this.registeredTeams)
    },
    (error)=>{
      this.toast.error("Problem occured to get Registered Teams By ID");
      console.log(error);
    })
  }

  handleGetUserByEventId(id:number){
    this.eventService.getUsersRegisteredInEvent(id).subscribe(res=>{
      this.registeredUsers = res;
      console.log("Registered User By ID : "+this.registeredUsers);      
    },
    (error)=>{
      this.toast.error("Problem occured to get Registered Users By ID");
      console.log(error);
    }

    )
  }

}
