import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SigninRequestPayload } from './signin-request.payload';
import { throwError } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  signinRequestPayload: SigninRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;
  error: string;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signinRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //sending Login data to server through service and getting back response
  login() {
    this.signinRequestPayload.username = this.loginForm.get('username').value;
    this.signinRequestPayload.password = this.loginForm.get('password').value;
    this.authService.login(this.signinRequestPayload).subscribe(
      (data) => {
        this.isError = false;
        if (this.authService.getUserType() === '[ROLE_ADMIN]') {
          this.router.navigateByUrl('/adminhome');
          this.toastr.success('Login Successful');
        } else {
          this.router.navigateByUrl('/userhome');
          if (this.returnUrl.startsWith('/userhome/invite')) {
            this.router.navigateByUrl(this.returnUrl);
          }
          this.toastr.success('Login Successful');
        }
      },
      (error) => {
        this.isError = true;
        console.log(error);
        this.error = error.error.message;
      }
    );
  }
}
