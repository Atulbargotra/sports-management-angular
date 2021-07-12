import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
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
  count = 0;
  notificationsAvailable: boolean = false;
  faBell = faBell;
  isLoggedIn: boolean;
  showNoti: boolean = false;
  notifications: NotificationResponsePayload[];
  username: string;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.notificationService.getUserNotifications().subscribe(
      (data) => {
        this.notifications = data;
        this.count = data.length;
      },
      () => {}
    );
    this.username = this.authService.getUserName();
  }

  //Signout feature
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
  loadNotifications() {
    console.log(this.showNoti);
    this.showNoti = !this.showNoti;
  }
  @HostListener('document:mousedown', ['$event'])
  clickedOut(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // clicked outside => close dropdown list
      this.showNoti = false;
    }
  }
  deleteNotification(id: number, eventId: number, message: string) {
    console.log(message);
    if (message.startsWith('Schedule')) {
      console.log('ininni');
      this.router.navigateByUrl(`/userhome/schedule/${eventId}`);
    } else {
      this.notificationService.deleteNotification(id).subscribe((data) => {
        this.notifications = this.notifications.filter(
          (notification) => notification.id !== id
        );
        this.count = this.count - 1;
      });
      this.router.navigateByUrl('/userhome/winners');
    }
  }
}
