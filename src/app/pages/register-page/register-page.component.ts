import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';
import { TeamDetailsPayload } from 'src/app/Model/teamDetailsPayload';
import { TeamRequestPayload } from 'src/app/Model/teamRequestPayload';
import { EventService } from 'src/app/services/event.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  event: EventResponsePayload;
  teamForm: FormGroup;
  pid: number;
  maxMembers: number;
  teamInviteLink: string;
  teamRequestPayload: TeamRequestPayload;
  inviteLinkAvailable: boolean = false;

  submitted:boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private toast: ToastrService,
    private teamService: TeamService,
    private fb: FormBuilder,
    private router: Router
  ) {
    
  }

  //Registered Team Details
  registeredTeams: TeamDetailsPayload[];

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: ['',Validators.required],
      description : ['',Validators.required],
      city : ['',Validators.required],
      maxMembers : ['',Validators.required],
      contact : ['',[Validators.required,Validators.minLength(10)]]
    })


    this.activatedRoute.paramMap.subscribe((res) => {
      this.pid = +res.get('id'); // + is added to convert pid from string type to number
      this.handleGetEventById(this.pid);
      this.handleGetRegisteredTeams(this.pid);
    });  
  }

  handleGetEventById(id: number) {
    this.eventService.getEventById(id).subscribe(
      (getRes) => {
        this.event = getRes;
        this.maxMembers = this.event.maxMembersInTeam;
        this.teamForm.patchValue({
          maxMembers: this.maxMembers
        })
      },
      (error) => {
        this.toast.error('Problem Occured');
        console.log(error);
      }
    );
  }
  handleGetRegisteredTeams(id: number) {
    this.teamService.geTeamsByEventId(id).subscribe(
      (data) => {
        this.registeredTeams = data;
      },
      (error) => {
        this.toast.error('unable to fetch teams');
      }
    );
  }

  get f(){
    return this.teamForm.controls;
  }

  createTeam() {
    // this.teamRequestPayload.name = this.teamForm.get('name').value;
    // this.teamRequestPayload.description =
    //   this.teamForm.get('description').value;
    // this.teamRequestPayload.city = this.teamForm.get('city').value;
    // this.teamRequestPayload.contact = this.teamForm.get('contact').value;
    // this.teamRequestPayload.maxMembers = Number(
    //   this.teamForm.get('maxMembers').value
    // );

    const teamRequest = {
      name : this.f.name.value,
      description : this.f.description.value,
      city : this.f.city.value,
      contact : this.f.contact.value,
      maxMembers : Number(this.f.maxMembers.value)
    }

    console.log(teamRequest);
    this.eventService
      .registerAsTeam(this.pid, teamRequest)
      .subscribe(
        (data) => {
          this.toast.success('Joined to Event');
          //this.router.navigateByUrl('/userhome');
          this.inviteLinkAvailable = true;
          this.teamInviteLink = data.link;
        },
        (errorObj) => {
          this.toast.error(errorObj.error.message);
        }
      );
  }
  join(team: TeamDetailsPayload) {
    this.teamService.joinTeam(team.id, this.pid).subscribe(
      () => {
        this.toast.success('Email Send to Team Admin');
        this.router.navigateByUrl('/userhome');
      },
      (errorObj) => {
        this.toast.error(errorObj.error.message);
      }
    );
  }
  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.teamInviteLink;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  onRegister(){
    this.submitted = true;
    console.log("zz")
    if (this.teamForm.invalid) return;

    this.createTeam();
    console.log("zz")
  }
}
