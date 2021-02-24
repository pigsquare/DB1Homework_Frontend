import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {C} from '../../shared/models/c';
import {CourseService} from '../../shared/services/course.service';
import {ScService} from '../../shared/services/sc.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ScTeacherResponse} from '../../shared/models/sc-teacher-response';
import {AddTeacherDialogComponent} from '../../admin/teacher-manage/teacher-manage.component';
import {GradeStuRequest} from '../../shared/models/grade-stu-request';

@Component({
  selector: 'app-course-grade-manage',
  templateUrl: './course-grade-manage.component.html',
  styleUrls: ['./course-grade-manage.component.scss']
})
export class CourseGradeManageComponent implements OnInit {

  cno: string;
  cInfo: C;
  dataSource: MatTableDataSource<ScTeacherResponse>;
  displayedColumns: string[] = ['sno', 'sname', 'grade', 'point', 'edit'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cService: CourseService,
    private scService: ScService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cno = this.route.snapshot.paramMap.get('id');
    this.cInfo = new C();
    this.getData();
  }
  getData(): void{
    this.cService.findByCno(this.cno).subscribe(r => {
      this.cInfo = r;
    });
    this.scService.getFromT(this.cno).subscribe(r => {
      this.dataSource = new MatTableDataSource<ScTeacherResponse>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  setGrade(sc: ScTeacherResponse): void{
    const dialogRef = this.dialog.open(GradeStuDialogComponent,{
      width: '320px',
      data: {
        sno: sc.sno,
        sname: sc.sname,
        grade: '',
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data){
        const req = new GradeStuRequest();
        req.cno = this.cno;
        req.sno = data.sno;
        req.score = data.grade;
        this.scService.postScore(req).subscribe(r1 => {
          this.snackBar.open('提交成功', undefined, {duration: 2000});
          this.getData();
        }, () => {
          this.snackBar.open('提交失败', undefined, {duration: 2000});
        });
      }
    });
  }
  goBack(): void{
    history.back();
  }

}
export interface GradeStuDialogData {
  sname: string;
  sno: string;
  grade: string;
}

@Component({
  selector: 'app-grade-stu-dialog',
  templateUrl: './grade-stu-dialog.html'
})
export class GradeStuDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<AddTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GradeStuDialogData
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
