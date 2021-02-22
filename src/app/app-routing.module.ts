import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {StuHomeComponent} from './stu/home/home.component';
import {TeacherHomeComponent} from './teacher/home/home.component';
import {AdminHomeComponent} from './admin/home/home.component';
import {StuGuardGuard} from './shared/guard/stu-guard.guard';
import {TeacherGuard} from './shared/guard/teacher.guard';
import {AdminGuard} from './shared/guard/admin.guard';
import {HomepageComponent} from './homepage/homepage.component';
import {StuManageComponent} from './admin/stu-manage/stu-manage.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 's', component: StuHomeComponent, canActivate: [StuGuardGuard], canActivateChild: [StuGuardGuard]},
  {path: 't', component: TeacherHomeComponent, canActivate: [TeacherGuard], canActivateChild: [TeacherGuard]},
  {path: 'admin', component: AdminHomeComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard], children: [
      {path: 'stu-manage', component: StuManageComponent}
    ]},
  {path: '', component: HomepageComponent},
  // {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
