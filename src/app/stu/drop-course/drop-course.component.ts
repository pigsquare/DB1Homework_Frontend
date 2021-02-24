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
  selector: 'app-drop-course',
  templateUrl: './drop-course.component.html',
  styleUrls: ['./drop-course.component.scss']
})
export class DropCourseComponent implements OnInit {

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
    this.cService.getUngradedC().subscribe(r => {
      this.dataSource = new MatTableDataSource<CourseAvailResponse>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  dropC(c: CourseAvailResponse): void{
    if (confirm('确定退选' + c.cname + '吗？')){
      this.scService.dropC(c.cno).subscribe(r => {
        this.getData();
        this.snackBar.open('退课成功', undefined, {duration: 2000});
      }, () => {
        this.snackBar.open('退课失败', undefined, {duration: 2000});
      });
    }
  }

}
