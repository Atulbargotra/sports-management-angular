import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { NotificationResponsePayload } from 'src/app/Model/notificationResponsePayload';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css'],
})
export class UserheaderComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  notifications: NotificationResponsePayload[];
  count = 0;
  notificationsAvailable: boolean = false;
  faBell = faBell;
  isLoggedIn: boolean;
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadNotifications();
  }

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
  loadNotifications() {
    this.notificationService.getUserNotifications().subscribe(
      (data) => {
        this.notificationsAvailable = true;
        this.notifications = data;
        this.count = this.notifications.length;
        console.log(this.count)
      },
      () => {
        this.notificationsAvailable = false;
      }
    );
  }
}
