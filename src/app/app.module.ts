import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { AddeventComponent } from './pages/addevent/addevent.component';
import { AdminheaderComponent } from './layouts/adminheader/adminheader.component';
import { UserheaderComponent } from './layouts/userheader/userheader.component';
import { EventsComponent } from './pages/events/events.component';
import { ParticipatedEventsComponent } from './pages/participated-events/participated-events.component';
import { WinnersComponent } from './pages/winners/winners.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FilterComponent } from './components/filter/filter.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';
import { AnnounceWinnerComponent } from './pages/announce-winner/announce-winner.component';
import { PublishedComponent } from './pages/published/published.component';
//For HttpRequest
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//for working with forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//for Toaster messages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//fontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//ngx-webstorage
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TokenInterceptor } from './token-interceptor';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisteredTeamsComponent } from './components/registered-teams/registered-teams.component';
import { DraftsComponent } from './pages/drafts/drafts.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { EditeventComponent } from './pages/editevent/editevent.component';
import { ParticipantsComponent } from './pages/participants/participants.component';

import { CachingInterceptor } from './cachingInterceptor';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ParticipationlistComponent } from './components/participationlist/participationlist.component';
import { InviteComponent } from './pages/invite/invite.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { EventFeedbackComponent } from './pages/event-feedback/event-feedback.component';
import { ChartsModule } from 'ng2-charts';
import { AdminFeedbackComponent } from './pages/admin-feedback/admin-feedback.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    AdminhomeComponent,
    UserhomeComponent,
    AddeventComponent,
    AdminheaderComponent,
    AnnounceWinnerComponent,
    PublishedComponent,
    FilterComponent,
    EventlistComponent,
    UserheaderComponent,
    EventsComponent,
    ParticipatedEventsComponent,
    WinnersComponent,
    ProfileComponent,
    RegisterPageComponent,
    RegisteredTeamsComponent,
    DraftsComponent,
    EditeventComponent,
    ParticipantsComponent,
    MatchCardComponent,
    ScheduleComponent,
    ParticipationlistComponent,
    InviteComponent,
    FeedbackComponent,
    FeedbackListComponent,
    EventFeedbackComponent,
    AdminFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxWebstorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CachingInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
