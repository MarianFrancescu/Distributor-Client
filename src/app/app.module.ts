import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { ProfileComponent } from './profile/profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { RegisterComponent } from './register/register.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DisciplinesComponent,
    ProfileComponent,
    RegisterComponent,
    ProfileDetailsComponent,
    ResetPasswordComponent,
    DeleteUserComponent,
    AlertDialogComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'disciplines', component: DisciplinesComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
