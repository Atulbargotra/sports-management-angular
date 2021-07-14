import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserProfile } from 'src/app/Model/userProfile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
})
export class AdminheaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  user: Observable<UserProfile>;
  profilePic: string;
  faSignOutAlt = faSignOutAlt;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.userService.getUserProfile().subscribe((data) => {
      this.profilePic = data.picture;
    });
    this.username = this.authService.getUserName();
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
