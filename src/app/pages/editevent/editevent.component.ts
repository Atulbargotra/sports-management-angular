import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../services/event.service';
import { EventRequestPayload } from '../../Model/eventRequestPayload';


//reactive form
import {FormGroup,FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css'],
})
export class EditeventComponent implements OnInit {

  picture:string;
  pid: number;
  UpdateEventForm:FormGroup;
  updated:boolean=false;
  eventId: number;

  constructor(
    private eventService: EventService,
    private toast: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {

    this.UpdateEventForm = this.fb.group({
      eventName: ['',Validators.required],
      description: ['',Validators.required],
      location: ['',Validators.required],
      category: [''],
      type: [''],
      eventDate: [''],
      lastDate: [''],
      maxParticipant: ['',Validators.required],
      maxMembersInTeam: [''],
      venue: ['']
    })


    this.activatedRoute.paramMap.subscribe((res) => {
      this.pid = +res.get('id'); // + is added to convert pid from string type to number
      this.handleGetEventById(this.pid);
    });
  }


  get f(){
    return this.UpdateEventForm.controls;
  }

  handleGetEventById(id: number) {
    this.eventService.getEventById(id).subscribe(
      (data) => {
        this.UpdateEventForm.patchValue({
          eventName: data.eventName,
          description: data.description,
          category: data.category,
          type: data.type,
          maxParticipant: data.maxParticipant,
          lastDate: data.lastDate,
          eventDate: data.eventDate,
          location: data.location,
          maxMembersInTeam: data.maxMembersInTeam,
          venue: data.venue          
        })
        this.picture = data.picture;
        this.eventId = data.id
      },
      (error) => {
        this.toast.error('Problem Occured');
        console.log(error);
      }
    );
  }

  //To add a field Total members in a team
  isTeam() {
    return this.f.type.value === 'TEAM' ? true : false;
  }

  setPicture() {
    switch (this.f.category.value) {
      case 'cricket': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/cricket.jpeg?alt=media&token=142af2aa-52c5-49ef-93e0-964bb3651e8d';
        break;
      }
      case 'football': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/football.jpg?alt=media&token=41fd1240-1e99-48f4-bbaf-afaffcf057cf';
        break;
      }
      case 'basketball': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/basketball.jpeg?alt=media&token=d1bad8a4-9246-4900-b00e-2fc1823b94d7';
        break;
      }
      case 'badmintion': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/badmintion.jpeg?alt=media&token=4f1feac8-fb9a-4b8a-a879-e600374a1286';
        break;
      }
      case 'chess': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/chess.jpeg?alt=media&token=506d50ee-fb2e-48cc-aac4-433394248fd0';
        break;
      }
      case 'volleyball': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/vollyball.jpeg?alt=media&token=43409a2d-464a-4981-a36a-d755575ad104';
        break;
      }
      case 'tableTennis': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/tableTennis.jpeg?alt=media&token=7dba7ea1-f52c-49e2-8693-8ce69633ad5e';
        break;
      }
      case 'carrom': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/carrom%20(2).jpg?alt=media&token=3c1c7fcf-073a-4d74-a8e3-ed18edcd52e4';
        break;
      }
      case '8ballpool': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/stephen-collins-cRhNdY9-2Sc-unsplash%20(1).jpg?alt=media&token=12532bb2-beb6-4b42-8428-8a088be3df8e';
        break;
      }
      default: {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/no-image.jpg?alt=media&token=94024470-52dd-4457-810d-e6b437dfddb0';
        break;
      }
    }
  }

  onUpdateEvent(id:number){

   this.updated = true;
   if(this.UpdateEventForm.invalid) return; 

    const event: EventRequestPayload = {
        eventName: this.f.eventName.value,
        description: this.f.description.value,
        location: this.f.location.value,
        category: this.f.category.value.toUpperCase(),
        type: this.f.type.value.toUpperCase(),
        venue: this.f.venue.value.toUpperCase(),
        eventDate: this.f.eventDate.value,
        lastDate: this.f.lastDate.value,
        maxParticipant: this.f.maxParticipant.value,
        maxMembersInTeam: this.f.maxMembersInTeam.value,
        picture: this.picture,
  };

  console.log(event);
    this.eventService.editDraft(id,event).subscribe(res=>{
      this.toast.success('Event updated successfully');
      this.route.navigateByUrl('/adminhome');
    },
    (error)=>{
      this.toast.error('Unable to update event');
    }
    )
  }
  
  
}

