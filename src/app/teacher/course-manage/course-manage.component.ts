import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {C} from '../../shared/models/c';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CourseService} from '../../shared/services/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TAddRequest} from '../../shared/models/t-add-request';
import {AddTeacherDialogComponent} from '../../admin/teacher-manage/teacher-manage.component';
import {CAddRequest} from '../../shared/models/c-add-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.scss']
})
export class CourseManageComponent implements OnInit {

  dataSource: MatTableDataSource<C>;
  displayedColumns: string[] = ['cno', 'cname', 'cdept', 'credit', 'edit'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private cService: CourseService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getC();
  }
  getC(): void{
    this.cService.getTeachC().subscribe(r => {
      this.dataSource = new MatTableDataSource<C>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteC(delC: C): void{
    if (confirm('Are yue sure to delete ' + delC.cname + '?')){
      this.cService.delC(delC.cno).subscribe(r => {
        this.getC();
        this.snackBar.open('删除成功', undefined, {duration: 2000});
      }, () => {
        this.snackBar.open('删除失败', undefined, {duration: 2000});
      });
    }
  }
  addC(): void{
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '300px',
      data: new CAddRequest()
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r){
        this.cService.addC(r).subscribe(() => {
          this.snackBar.open('添加成功', undefined, {duration: 2000});
          this.getC();
        }, () => {
          this.snackBar.open('添加失败', undefined, {duration: 2000});
        });
      }
    });
  }
  updateC(c: C): void{
    const request = new CAddRequest();
    request.cno = c.cno;
    request.credit = c.credit;
    request.cdept = c.cdept;
    request.cname = c.cname;
    const dialogRef = this.dialog.open(UpdateCourseDialogComponent, {
      width: '300px',
      data: request
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r){
        this.cService.updateC(r).subscribe(() => {
          this.snackBar.open('添加成功', undefined, {duration: 2000});
          this.getC();
        }, () => {
          this.snackBar.open('添加失败', undefined, {duration: 2000});
        });
      }
    });
  }

  gotoDetail(cno: string): void{
    this.router.navigateByUrl(`/t/course/${cno}`).then();
  }

}

@Component({
  selector: 'app-courser-update-dialog',
  templateUrl: './course-update-dialog.html'
})
export class UpdateCourseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CAddRequest
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-courser-add-dialog',
  templateUrl: './course-add-dialog.html'
})
export class AddCourseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CAddRequest
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
