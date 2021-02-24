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

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.scss']
})
export class SelectCourseComponent implements OnInit {

  dataSource: MatTableDataSource<CourseAvailResponse>;
  displayedColumns: string[] = ['cno', 'cname', 'cdept', 'credit', 'tname', 'edit'];
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
    this.cService.getAvailC().subscribe(r => {
      this.dataSource = new MatTableDataSource<CourseAvailResponse>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  selectC(c: CourseAvailResponse): void{
    if (confirm('确定选修' + c.cname + '吗？')){
      this.scService.selectC(c.cno).subscribe(r => {
        this.getData();
        this.snackBar.open('选课成功', undefined, {duration: 2000});
      }, () => {
        this.snackBar.open('选课失败', undefined, {duration: 2000});
      });
    }
  }

}
