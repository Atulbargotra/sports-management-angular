import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

//For HttpRequest
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//for working with forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//for Toaster messages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//fontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnnounceWinnerComponent } from './pages/announce-winner/announce-winner.component';
import { PublishedComponent } from './pages/published/published.component';
//ngx-webstorage
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TokenInterceptor } from './token-interceptor';

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
    PublishedComponent
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
