import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { AdminSignupRequestPayload } from './admin-signup-request-payload';
import { SignupRequestPayload } from './signup-request-payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  adminSignupRequestPayload: AdminSignupRequestPayload;
  formLoad: boolean = true;
  userType;
  userSignupForm: FormGroup;
  adminSignupForm: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.signupRequestPayload = {
      email: '',
      username: '',
      password: '',
    };
    this.adminSignupRequestPayload = {
      email: '',
      username: '',
      password: '',
      adminAccessPassword: '',
    };
  }

  ngOnInit(): void {
    this.userSignupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      useremail: new FormControl('', [Validators.required, Validators.email]),
      userpassword: new FormControl('', Validators.required),
    });
    this.adminSignupForm = new FormGroup({
      adminname: new FormControl('', Validators.required),
      adminemail: new FormControl('', Validators.required),
      adminpassword: new FormControl('', Validators.required),
      adminAccessPassword: new FormControl('', Validators.required),
    });
  }

  clickUserButton() {
    this.userType = 'User';
    this.formLoad = true;
  }

  clickAdminButton() {
    this.userType = 'Admin';
    this.formLoad = false;
  }

  usersignup() {
    this.signupRequestPayload.email =
      this.userSignupForm.get('useremail').value;
    this.signupRequestPayload.username =
      this.userSignupForm.get('username').value;
    this.signupRequestPayload.password =
      this.userSignupForm.get('userpassword').value;

    this.authService.userSignup(this.signupRequestPayload).subscribe(
      (data) => {
        this.router.navigate(['/'], {
          queryParams: { registered: 'true' },
        });
        this.toastr.success('Registration Success! Please Check Your Mail for Activation');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      }
    );
  }

  adminsignup() {
    this.adminSignupRequestPayload.email =
      this.adminSignupForm.get('adminemail').value;
    this.adminSignupRequestPayload.username =
      this.adminSignupForm.get('adminname').value;
    this.adminSignupRequestPayload.password =
      this.adminSignupForm.get('adminpassword').value;
    this.adminSignupRequestPayload.adminAccessPassword =
      this.adminSignupForm.get('adminAccessPassword').value;
    this.authService.adminSignup(this.adminSignupRequestPayload).subscribe(
      (data) => {
        this.router.navigate([''], {
          queryParams: { registered: 'true' },
        });
        this.toastr.success('Registration Success! Please Check Your Mail for Activation');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      }
    );
  }
}
