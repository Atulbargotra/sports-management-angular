import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute:ActivatedRoute,
    private route:Router 
  ) {

   }

  registeredTeams:TeamDetailsPayload[];
  registeredUsers:UserRegistered[];
  event:EventResponsePayload;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res=>{
      let pid = +res.get('id');
      console.log(pid);
      this.handleGetTeamsByEventID(pid)
      this.handleGetRegisteredUserByEventId(pid)

      //got event details data through routes state transfer
      // console.log(history.state)
      this.event = history.state;
    })
  }


  handleGetTeamsByEventID(id:number){
    console.log("Teams")
    this.teamService.geTeamsByEventId(id).subscribe(res=>{
      this.registeredTeams = res;
      console.log("registered Teams below");
      console.log(this.registeredTeams)
    },
    (error)=>{
      this.toast.error("Problem occured to get Registered Teams By EventID");
      console.log(error);
    })
  }

  handleGetRegisteredUserByEventId(id:number){
    this.eventService.getUsersRegisteredInEvent(id).subscribe(res=>{
      this.registeredUsers = res
      console.log(this.registeredUsers)
    },
    (error)=>{
      this.toast.error("Problem occured to get Registered User By EventID");
      console.log(error);
    })
  }


}
