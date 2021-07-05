import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/services/team.service';
import {TeamDetailsPayload} from '../../Model/teamDetailsPayload'

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  constructor(
    private teamService:TeamService,
    private toast:ToastrService
  ) { }

  registeredTeams:TeamDetailsPayload[];

  ngOnInit(): void {
  
  }



}
