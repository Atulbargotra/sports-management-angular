import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddeventComponent } from './pages/addevent/addevent.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { AnnounceWinnerComponent } from './pages/announce-winner/announce-winner.component';
import { HomeComponent } from './pages/home/home.component';
import { PublishedComponent } from './pages/published/published.component';

const routes: Routes = [
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
    ],
  },
  {
    path: 'adminhome',
    component: AdminhomeComponent,
    children: [
      {
        path:'announceWinner',
        component: AnnounceWinnerComponent
      },
      {
        path:'published',
        component:PublishedComponent
      },
      {
        path:'addevent',
        component: AddeventComponent
      },
      {
        path: '',
        component: AddeventComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// {
//   path: '',
//   component: SigninComponent,
//   children: [
//     {
//       path: '',
//       component: UserSigninComponent,
//     },
//     {
//       path: 'userlogin',
//       component: UserSigninComponent,
//     },

//     {
//       path: 'register',
//       component: SignupComponent,
//     },
//   ],
// },
