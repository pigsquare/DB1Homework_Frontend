import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '../../shared/services/teacher.service';
import {MatTableDataSource} from '@angular/material/table';
import {T} from '../../shared/models/t';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TAddRequest} from '../../shared/models/t-add-request';

@Component({
  selector: 'app-teacher-manage',
  templateUrl: './teacher-manage.component.html',
  styleUrls: ['./teacher-manage.component.scss']
})
export class TeacherManageComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<T>;
  displayedColumns: string[] = ['tno', 'tname', 'tdept', 'tclass', 'edit'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getT();
  }
  getT(): void{
    this.teacherService.getT().subscribe(r => {
      this.dataSource = new MatTableDataSource<T>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteT(delT: T): void{
    if (confirm('Are you sure to delete ' + delT.tname + '?')){
      this.teacherService.delT(delT.tno).subscribe(r => {
        this.getT();
        this.snackBar.open('删除成功', undefined, {duration: 2000});
      });
    }
  }

  addT(): void{
    const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
      width: '320px',
      data: new TAddRequest()
    });
    dialogRef.afterClosed().subscribe(r => {
      console.log(r);
      if (r){
        this.teacherService.addT(r).subscribe(() => {
          this.snackBar.open('添加成功', undefined, {duration: 2000});
          this.getT();
        }, () => {
          this.snackBar.open('添加失败', undefined, {duration: 2000});
        });
      }
    });
  }
  updateT(t: T): void{
    const req = new TAddRequest();
    req.logn = t.logn;
    req.tno = t.tno;
    req.tname = t.tname;
    req.tclass = t.tclass;
    req.tdept = t.tdept;
    const dialogRef = this.dialog.open(UpdateTeacherDialogComponent, {
      width: '320px',
      data: req
    });
    dialogRef.afterClosed().subscribe(r => {
      console.log(r);
      if (r){
        this.teacherService.updateT(r).subscribe(() => {
          this.snackBar.open('更新成功', undefined, {duration: 2000});
          this.getT();
        }, () => {
          this.snackBar.open('更新失败', undefined, {duration: 2000});
        });
      }
    });
  }
  ngAfterViewInit(): void {
  }

}

@Component({
  selector: 'app-teacher-add-dialog',
  templateUrl: './teacher-add-dialog.html'
})
export class AddTeacherDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TAddRequest
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-teacher-update-dialog',
  templateUrl: './teacher-update-dialog.html'
})
export class UpdateTeacherDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TAddRequest
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
