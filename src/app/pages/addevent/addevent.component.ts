import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { EventRequestPayload } from 'src/app/Model/eventRequestPayload';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css'],
})
export class AddeventComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private router: Router,
    private toast: ToastrService
  ) {}

  //Add event form Data
  eventName: string;
  description: string;
  location: string;
  category: string;
  type: string;
  startDate: string;
  endDate: string;
  maxParticipant: number;
  venue: string;
  picture: string =
    'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/no-image.jpg?alt=media&token=94024470-52dd-4457-810d-e6b437dfddb0';
  totalMembers: number;

  //set Picture based on select element - > Variable
  selectedEvent: string;

  ngOnInit(): void {}

  handleAddEvents(f: NgForm) {
    const event: EventRequestPayload = {
      eventName: this.eventName,
      description: this.description,
      location: this.location,
      category: this.category.toUpperCase(),
      type: this.type.toUpperCase(),
      eventDate: this.startDate,
      lastDate: this.endDate,
      maxParticipant: this.maxParticipant,
      picture: this.picture,
      maxMembersInTeam: this.totalMembers,
      venue: this.venue,
    };
    f.reset(); //reset form data after submiting
    this.eventService.addEvent(event).subscribe((postResponse) => {
      const resPost = JSON.parse(JSON.stringify(postResponse));
      if (resPost.status == 200) {
        this.toast.success('Event added successfully');
      } else {
        this.toast.error('Problem occured while adding event');
      }
    });
  }
  handleSaveDraft(f: NgForm) {
    // this.eventRequestPayload.eventName = this.eventForm.get('eventName').value;
    // this.eventRequestPayload.description =
    //   this.eventForm.get('description').value;
    // this.eventRequestPayload.location = this.eventForm.get('location').value;
    // this.eventRequestPayload.category = this.eventForm
    //   .get('category')
    //   .value.toUpperCase();
    // this.eventRequestPayload.type = this.eventForm.get('type').value;
    // this.eventRequestPayload.eventDate = this.eventForm.get('eventDate').value;
    // this.eventRequestPayload.lastDate = this.eventForm.get('lastDate').value;
    // this.eventRequestPayload.maxParticipant =
    //   this.eventForm.get('maxParticipant').value;
    // console.log(this.eventRequestPayload);
    const event: EventRequestPayload = {
      eventName: this.eventName,
      description: this.description,
      location: this.location,
      category: this.category.toUpperCase(),
      type: this.type.toUpperCase(),
      venue: this.venue,
      eventDate: this.startDate,
      lastDate: this.endDate,
      maxParticipant: this.maxParticipant,
      picture: this.picture,
      maxMembersInTeam: this.totalMembers,
    };
    f.reset();
    this.eventService.saveDraft(event).subscribe(
      (data) => {
        this.toast.success('Draft Saved');
        this.router.navigateByUrl('/adminhome');
      },
      (error) => {
        throwError(error);
        this.toast.error('Could not save draft');
      }
    );
  }

  //To add a field Total members in a team
  isTeam() {
    return this.type == 'team' ? true : false;
  }

  setPicture() {
    switch (this.selectedEvent) {
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
}
