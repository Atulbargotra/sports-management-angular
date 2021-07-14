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
    'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/no-image.jpg?alt=media&token=94024470-52dd-4457-810d-e6b437dfddb0';
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
