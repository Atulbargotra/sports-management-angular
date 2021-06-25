import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
})
export class AdminheaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  faSignOutAlt = faSignOutAlt;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
