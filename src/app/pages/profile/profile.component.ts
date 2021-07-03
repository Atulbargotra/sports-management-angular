import { Component, OnInit } from '@angular/core';
//reactive form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//toastr message
import { ToastrService } from 'ngx-toastr';
//userService
import { UserService } from 'src/app/services/user.service';
//model
import { UserProfile } from '../../Model/userProfile';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted: boolean = false;

  //UserProfile Model
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  address: string;
  email: string;
  contact: number;
  picture: string =
    'https://firebasestorage.googleapis.com/v0/b/sportseventmanagement-a3d28.appspot.com/o/userImg.PNG?alt=media&token=78465c4d-4389-40c5-827d-afbb7ecdd78b';

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private userService: UserService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onSaveChanges() {
    this.submitted = true;

    //if form is invalid return
    if (this.profileForm.invalid) {
      return;
    }

    this.handleUserdata();
  }

  handleUserdata() {
    const userdata: UserProfile = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      gender: this.f.gender.value,
      city: this.f.city.value,
      address: this.f.address.value,
      email: this.f.email.value,
      contact: this.f.contact.value,
      picture: this.picture,
    };

    this.userService.updateUserProfile(userdata).subscribe(
      (res) => this.toast.success('Profile Updated Successfully'),
      (error) => this.toast.error('Problem occured to update profile')
    );
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
}
