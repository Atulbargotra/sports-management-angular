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
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

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
  picture: string;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private router: Router,
    private authService: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      city: [''],
      address: [''],
      email: [''],
      contact: ['', [Validators.minLength(10),Validators.maxLength(10)]],
    });

    this.userService.getUserProfile().subscribe(
      (data) => {
        this.profileForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          city: data.city,
          address: data.address,
          email: data.email,
          contact: data.contact,
        });
        this.picture =
          data.picture ||
          'https://img.icons8.com/ultraviolet/80/000000/test-account.png';
      },
      (error) => {}
    );
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
      (res) => {
        this.toast.success('Profile Updated Successfully');
        console.log(this.authService.getUserType() === '[ROLE_USER]');
        const profile =
          this.authService.getUserType() === '[ROLE_USER]'
            ? '/userhome'
            : '/adminhome';
        this.router.navigateByUrl(profile);
      },
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
