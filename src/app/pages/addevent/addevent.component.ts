import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { EventRequestPayload } from 'src/app/Model/eventRequestPayload';
import { EventService } from 'src/app/services/event.service';

//reactive form
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
//AngularFireStorage
import { AngularFireStorage } from '@angular/fire/storage';
//Image resizer
import { readAndCompressImage } from 'browser-image-resizer';
//ImgConfig
import { Imgconfig } from '../../utilities/ImgConfig';
//unique uuid
import { v4 as uuidv4 } from 'uuid';
//finalize
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css'],
})
export class AddeventComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private router: Router,
    private toast: ToastrService,
    private storage: AngularFireStorage,
    private fb: FormBuilder
  ) {}

  picture: string =
    'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/no-image.jpg?alt=media&token=c47e40a2-8d4a-45bb-bed6-5345e1fe2b81';
  addEventForm: FormGroup;
  submitted: boolean = false;
  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today)) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.addEventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      eventDate: ['', this.dateValidator],
      lastDate: ['', Validators.required],
      maxParticipant: ['', Validators.required],
      maxMembersInTeam: [''],
      venue: ['', Validators.required],
    });
  }

  get f() {
    return this.addEventForm.controls;
  }

  handleAddEvents() {
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

    this.eventService.addEvent(event).subscribe(
      (postResponse) => {
        this.toast.success('Event added successfully');
        this.router.navigateByUrl('/adminhome');
        this.onReset(); //reset form data after submiting
      },
      (error) => {
        this.toast.error('Unable to add event');
      }
    );
  }

  handleSaveDraft() {
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
    console.log('inside handleSaveDraft');

    this.eventService.saveDraft(event).subscribe(
      (data) => {
        console.log('inside handleSaveDraft service');
        this.toast.success('Draft Saved');
        this.router.navigateByUrl('/adminhome');
        this.onReset(); //reset form data after submiting
      },
      (error) => {
        throwError(error);
        this.toast.error('Could not save draft');
      }
    );
  }

  //To add a field Total members in a team
  isTeam() {
    return this.f.type.value === 'team' ? true : false;
  }

  //reset data after form submit
  onReset() {
    this.submitted = false;
    this.addEventForm.reset;
  }

  setPicture() {
    switch (this.f.category.value) {
      case 'cricket': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/CRICKET.jpg?alt=media&token=129ca445-3d2b-46a2-8369-ba643da50bf8';
        break;
      }
      case 'football': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/FOOTBALL.jpg?alt=media&token=96fdaba0-5a54-4329-a0ed-7a8df945b96a';
        break;
      }
      case 'basketball': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/BASKETBALL.jpg?alt=media&token=6ec696d0-983f-4c74-bc4e-9fd9aa0798d4';
        break;
      }
      case 'badmintion': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/BADMINTON.jpg?alt=media&token=a892fa96-ebc6-4f7f-a59e-89b610c4d704';
        break;
      }
      case 'chess': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/CHESS.jpg?alt=media&token=0d74054b-90b9-4235-8d66-e42dbdddd183';
        break;
      }
      case 'volleyball': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/VOLLEYBALL.jpg?alt=media&token=95f44d9a-c07d-45fc-981b-9f10fcbe8e0d';
        break;
      }
      case 'tableTennis': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/tableTennis.jpeg?alt=media&token=df7af050-c5d5-4c68-a144-80da407a8437';
        break;
      }
      case 'carrom': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/carrom.jpg?alt=media&token=c7f8fbaf-b2c9-4449-92eb-201702244cc4';
        break;
      }
      case '8ballpool': {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/8ballpool%20(2).jpg?alt=media&token=6feac33f-37db-4e7d-bb91-1a05d2267510';
        break;
      }
      default: {
        this.picture =
          'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/no-image.jpg?alt=media&token=c47e40a2-8d4a-45bb-bed6-5345e1fe2b81';
        break;
      }
    }
  }

  async ImageUpload(event) {
    const orignalFile = event.target.files[0]; //original image fetched from event when user upload
    //image compressed
    const compressedImg = await readAndCompressImage(orignalFile, Imgconfig);

    const filePath = uuidv4(); //filename in firebase storage
    const fileRef = this.storage.ref(filePath); //a pointer that refer to the file

    const task = this.storage.upload(filePath, compressedImg);
    //1st arg = name of file
    //2nd arg = resized image

    //snapshotChanges() checks what are the changes that are are happening and emiting the inforamtion(metadata) through pipe
    //task is basically uploading the file on firebase storage
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((ImgUrl) => {
            this.picture = ImgUrl;
            this.toast.success('Image uploaded successfully');
          });
        })
      )
      .subscribe();
  }

  //When add Event button is clicked
  onAddEvent() {
    this.submitted = true;
    if (this.addEventForm.invalid) return;

    this.handleAddEvents();
  }

  //When save draft button is clicked
  onSaveDraft() {
    this.submitted = true;
    if (this.addEventForm.invalid) return;
    console.log('inside onSaveDraft');
    this.handleSaveDraft();
  }
}
