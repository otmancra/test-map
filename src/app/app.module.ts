import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;
import { AgmCoreModule } from '@agm/core';


import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MapService } from './services/map.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'map', canActivate: [AuthGuardService], component: MapComponent },
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: '**', redirectTo: 'map' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    MapComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: environment.googleMapsKey})
  ],
  providers: [
    AuthGuardService,
    AuthService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
