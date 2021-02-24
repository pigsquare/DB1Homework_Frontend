import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CourseAvailResponse} from '../../shared/models/course-avail-response';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CourseService} from '../../shared/services/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ScService} from '../../shared/services/sc.service';
import {CourseTokenResponse} from '../../shared/models/course-token-response';

@Component({
  selector: 'app-grade-info',
  templateUrl: './grade-info.component.html',
  styleUrls: ['./grade-info.component.scss']
})
export class GradeInfoComponent implements OnInit {

  dataSource: MatTableDataSource<CourseTokenResponse>;
  displayedColumns: string[] = ['cno', 'cname', 'credit', 'grade', 'point'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private cService: CourseService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private scService: ScService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void{
    this.cService.getGradedC().subscribe(r => {
      this.dataSource = new MatTableDataSource<CourseTokenResponse>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
