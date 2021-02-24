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
import {TeacherManageComponent} from './admin/teacher-manage/teacher-manage.component';
import {AdminManageComponent} from './admin/admin-manage/admin-manage.component';
import {CourseManageComponent} from './teacher/course-manage/course-manage.component';
import {ScoreManageComponent} from './teacher/score-manage/score-manage.component';
import {CourseGradeManageComponent} from './teacher/course-grade-manage/course-grade-manage.component';
import {SelectCourseComponent} from './stu/select-course/select-course.component';
import {DropCourseComponent} from './stu/drop-course/drop-course.component';
import {GradeInfoComponent} from './stu/grade-info/grade-info.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 's', component: StuHomeComponent, canActivate: [StuGuardGuard], canActivateChild: [StuGuardGuard], children: [
      {path: 'select', component: SelectCourseComponent},
      {path: 'drop', component: DropCourseComponent},
      {path: 'grade', component: GradeInfoComponent},
    ]},
  {path: 't', component: TeacherHomeComponent, canActivate: [TeacherGuard], canActivateChild: [TeacherGuard], children: [
      {path: 'course_manage', component: CourseManageComponent},
      {path: 'score_manage', component: ScoreManageComponent},
      {path: 'course/:id', component: CourseGradeManageComponent},
    ]},
  {path: 'admin', component: AdminHomeComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard], children: [
      {path: 'stu_manage', component: StuManageComponent},
      {path: 'teacher_manage', component: TeacherManageComponent},
      {path: 'admin_manage', component: AdminManageComponent},
    ]},
  {path: '', component: HomepageComponent},
  // {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
