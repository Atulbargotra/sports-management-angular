import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/shared/auth.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddeventComponent } from './pages/addevent/addevent.component';
import { AdminFeedbackComponent } from './pages/admin-feedback/admin-feedback.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { AnnounceWinnerComponent } from './pages/announce-winner/announce-winner.component';
import { DraftsComponent } from './pages/drafts/drafts.component';
import { EditeventComponent } from './pages/editevent/editevent.component';
import { EventsComponent } from './pages/events/events.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { InviteComponent } from './pages/invite/invite.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { ParticipatedEventsComponent } from './pages/participated-events/participated-events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublishedComponent } from './pages/published/published.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { WinnersComponent } from './pages/winners/winners.component';

const routes: Routes = [
  {
    path: 'adminhome',
    component: AdminhomeComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'announceWinner',
        component: AnnounceWinnerComponent,
      },
      {
        path:'feedback/:id',
        component:AdminFeedbackComponent  //pie chart component to be added here 
      },
      {
        path: 'published/:id',
        component: ParticipantsComponent,
      },
      {
        path: 'published',
        component: PublishedComponent,
      },
      {
        path: 'addevent',
        component: AddeventComponent,
      },
      {
        path: 'editevent/:id',
        component: EditeventComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path:'feedback',
        component:AdminFeedbackComponent
      },
      {
        path: 'events',
        component: DraftsComponent,
      },
      {
        path: '',
        component: DraftsComponent,
      },
    ],
  },
  {
    path: 'userhome',
    component: UserhomeComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'participatedEvents',
        component: ParticipatedEventsComponent,
      },
      {
        path: 'winners',
        component: WinnersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'schedule/:id',
        component: ScheduleComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'register/:id',
        component: RegisterPageComponent,
      },
      {
        path:'feedback',
        component:FeedbackComponent
      },
      {
        path: '',
        component: EventsComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SigninComponent,
      },
      {
        path: 'register',
        component: SignupComponent,
      },
      {
        path: 'invite/:token',
        component: InviteComponent,
        canActivate: [AuthService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
