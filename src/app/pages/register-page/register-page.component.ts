import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  teamRequestPayload: TeamRequestPayload;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private toast: ToastrService,
    private teamService: TeamService,
    private fb: FormBuilder
  ) {
    this.teamRequestPayload = {
      name: '',
      description: '',
      email: '',
      city: '',
      maxMembers: 0,
      contact: '',
      members: [],
    };
  }

  //Registered Team Details
  registeredTeams: TeamDetailsPayload[];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      let pid = +res.get('id'); // + is added to convert pid from string type to number
      console.log(pid);
      this.handleGetEventById(pid);
      this.handleGetRegisteredTeams(pid);
    });
    this.teamForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      maxMembers: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      members: this.fb.array([this.fb.control(null)]),
    });
  }

  handleGetEventById(id: number) {
    this.eventService.getEventById(id).subscribe(
      (getRes) => {
        this.event = getRes;
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
  addMember(e): void {
    e.preventDefault();
    (this.teamForm.get('members') as FormArray).push(this.fb.control(null));
  }

  removeMember(index) {
    (this.teamForm.get('members') as FormArray).removeAt(index);
  }

  getMembersFormControls(): AbstractControl[] {
    return (<FormArray>this.teamForm.get('members')).controls;
  }
  createTeam() {
    this.teamRequestPayload.name = this.teamForm.get('name').value;
    this.teamRequestPayload.description =
      this.teamForm.get('description').value;
    this.teamRequestPayload.email = this.teamForm.get('email').value;
    this.teamRequestPayload.members = this.teamForm.get('members').value;
    this.teamRequestPayload.city = this.teamForm.get('city').value;
    this.teamRequestPayload.contact = this.teamForm.get('contact').value;
    this.teamRequestPayload.maxMembers = Number(
      this.teamForm.get('maxMembers').value
    );
    console.log(this.teamRequestPayload);
  }
}
