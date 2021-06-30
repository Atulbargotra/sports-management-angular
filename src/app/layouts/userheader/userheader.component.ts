import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationResponsePayload } from 'src/app/Model/notificationResponsePayload';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css'],
})
export class UserheaderComponent implements OnInit {
  notifications: NotificationResponsePayload[];
  notificationsAvailable: boolean = false;
  faBell = faBell;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getUserNotifications().subscribe(
      (data) => {
        this.notificationsAvailable = true;
        this.notifications = data;
      },
      () => {
        this.notificationsAvailable = false;
      }
    );
  }
}
