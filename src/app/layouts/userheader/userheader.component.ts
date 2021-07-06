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
  count = 0;
  notificationsAvailable: boolean = false;
  faBell = faBell;
  isLoggedIn: boolean;
  showNoti:boolean=false;



  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
<<<<<<< HEAD
    this.notificationService.getUserNotificationsCount().subscribe(
      (count) => {
        this.count = count;
        this.notificationsAvailable = true;
      },
      (error) => {
        this.notificationsAvailable = true;
      }
    );
=======
    // this.loadNotifications();
>>>>>>> 04ad74a28154ae9a5a3404e3b611f5bda5d421b8
  }

  ngOnInit(): void {}


  notifications: NotificationResponsePayload[]=[
    {
      eventName:'Cricket',
      message:'Cricket Winners Announced',
      picture:'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/cricket.jpeg?alt=media&token=142af2aa-52c5-49ef-93e0-964bb3651e8d'
    },
    {
      eventName:'Basketball',
      message:'Basketball Winners Announced',
      picture:'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/basketball.jpeg?alt=media&token=d1bad8a4-9246-4900-b00e-2fc1823b94d7'
    },
    {
      eventName:'Chess',
      message:'Chess Winners Announced',
      picture:'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/chess.jpeg?alt=media&token=506d50ee-fb2e-48cc-aac4-433394248fd0'
    },
    {
      eventName:'Volleyball',
      message:'Volleyball Winners Announced',
      picture:'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/vollyball.jpeg?alt=media&token=43409a2d-464a-4981-a36a-d755575ad104'
    },
  ]


  //Signout feature
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
<<<<<<< HEAD
  loadNotifications() {
    this.notificationService.getUserNotifications().subscribe(
      (data) => {
        this.notificationsAvailable = true;
        this.notifications = data;
        this.count = this.notifications.length;
        console.log(this.count);
      },
      () => {
        this.notificationsAvailable = false;
      }
    );
=======

  //trigger notification on click
  triggerNotificationBar(){
    this.showNoti = !this.showNoti;
>>>>>>> 04ad74a28154ae9a5a3404e3b611f5bda5d421b8
  }


  //fetching notification
  // loadNotifications() {
  //   this.notificationService.getUserNotifications().subscribe(
  //     (data) => {
  //       this.notificationsAvailable = true;
  //       this.notifications = data;
  //       this.count = this.notifications.length;
  //       console.log(this.count)
  //     },
  //     () => {
  //       this.notificationsAvailable = false;
  //     }
  //   );
  // }

  


}
