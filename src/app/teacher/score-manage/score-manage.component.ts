import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {C} from '../../shared/models/c';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ScTeacherResponse} from '../../shared/models/sc-teacher-response';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TAddRequest} from '../../shared/models/t-add-request';
import {AddTeacherDialogComponent} from '../../admin/teacher-manage/teacher-manage.component';
import {CourseService} from '../../shared/services/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-score-manage',
  templateUrl: './score-manage.component.html',
  styleUrls: ['./score-manage.component.scss']
})
export class ScoreManageComponent implements OnInit {

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
  gotoDetail(cno: string): void{
    this.router.navigateByUrl(`/t/course/${cno}`).then();
  }

}
