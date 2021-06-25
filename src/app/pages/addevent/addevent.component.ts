import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

//svg icons
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

//toastr message
import { ToastrService } from 'ngx-toastr';
import { EventResponsePayload } from 'src/app/Model/eventResponsePayload';

//service
import { EventService } from 'src/app/services/event.service';

//model
import { EventRequestPayload } from '../../Model/eventRequestPayload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css'],
})
export class AddeventComponent implements OnInit {
  //svg icons
  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;
  faUpload = faUpload;
  eventForm: FormGroup;
  eventRequestPayload: EventRequestPayload;

  

  eventList: EventResponsePayload[];

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.eventService.getEventDrafts().subscribe((events) => {
      this.eventList = events;
    },(error) => {
      throwError(error);
      this.toastr.error("Unable to fetch drafts")
    });
    this.eventRequestPayload = {
      eventName: '',
      description: '',
      maxParticipant: 0,
      location: '',
      eventDate: '',
      lastDate: '',
      type: '',
      category: ''
    };
  }
  ngOnInit(): void {
    this.eventForm = new FormGroup({
      eventName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      eventDate: new FormControl('', Validators.required),
      lastDate: new FormControl('', Validators.required),
      maxParticipant: new FormControl('', Validators.required),
    })
  }

  handleAddEvent() {
    console.log("iinininin")
    console.log(this.eventForm.get('eventName').value)

    this.eventRequestPayload.eventName = this.eventForm.get('eventName').value;
    this.eventRequestPayload.description = this.eventForm.get('description').value;
    this.eventRequestPayload.location = this.eventForm.get('location').value;
    this.eventRequestPayload.category = this.eventForm.get('category').value;
    this.eventRequestPayload.type=this.eventForm.get('type').value;
    this.eventRequestPayload.eventDate=this.eventForm.get('eventDate').value;
    this.eventRequestPayload.lastDate=this.eventForm.get('lastDate').value;
    this.eventRequestPayload.maxParticipant=this.eventForm.get('maxParticipant').value;
    console.log(this.eventRequestPayload)

    this.eventService.addEvent(this.eventRequestPayload).subscribe((data) => {

    },(error) => {
      throwError(error);
    })
  }
  handleSaveDraft(){
    this.eventRequestPayload.eventName = this.eventForm.get('eventName').value;
    this.eventRequestPayload.description = this.eventForm.get('description').value;
    this.eventRequestPayload.location = this.eventForm.get('location').value;
     this.eventRequestPayload.category = this.eventForm.get('category').value;
    this.eventRequestPayload.type=this.eventForm.get('type').value;
    this.eventRequestPayload.eventDate=this.eventForm.get('eventDate').value;
    this.eventRequestPayload.lastDate=this.eventForm.get('lastDate').value;
    this.eventRequestPayload.maxParticipant=this.eventForm.get('maxParticipant').value;
    console.log(this.eventRequestPayload)
    this.eventService.saveDraft(this.eventRequestPayload).subscribe((data) => {
      this.eventList.push(data)
      this.toastr.success("Draft Saved")
      this.router.navigateByUrl("/adminhome")
    },(error) => {
      throwError(error);
      this.toastr.error("Could not save draft")
    });

  }
  publish(id: number){
    this.eventService.publishDraftEvent(id).subscribe((data) => {
      this.eventList.filter((draft) => draft.id !== id);
      this.toastr.success("Published Event")
    },(error) => {
      throwError(error);
      this.toastr.error("Failed")
    })
  }
  delete(id: number){
    this.eventService.deleteDraft(id).subscribe((data) => {
      this.eventList.filter((draft) => draft.id !== id);
      this.toastr.success("Published Deleted")
    },(error) => {
      throwError(error);
      this.toastr.error("Failed")
    })
  }

 
}
