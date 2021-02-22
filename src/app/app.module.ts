import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordDialogComponent, HeaderComponent} from './shared/layout/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NavComponent } from './shared/layout/nav/nav.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import { StuHomeComponent } from './stu/home/home.component';
import { AdminHomeComponent} from './admin/home/home.component';
import { TeacherHomeComponent} from './teacher/home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StuManageComponent } from './admin/stu-manage/stu-manage.component';
import {AuthInterceptorService} from './shared/services/auth-interceptor.service';
import {StuService} from './shared/services/stu.service';
import {Stu} from './shared/models/stu';
import {AuthTokenResponse} from './shared/models/auth-token-response';
import {AuthTokenRequest} from './shared/models/auth-token-request';
import {AuthService} from './shared/services/auth.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    LoginComponent,
    StuHomeComponent,
    TeacherHomeComponent,
    AdminHomeComponent,
    HomepageComponent,
    StuManageComponent,
    ChangePasswordDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    _MatMenuDirectivesModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    MatSnackBar,
    StuService,
    Stu,
    AuthTokenResponse,
    AuthTokenRequest,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
