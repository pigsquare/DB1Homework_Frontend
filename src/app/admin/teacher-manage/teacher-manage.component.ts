import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '../../shared/services/teacher.service';
import {MatTableDataSource} from '@angular/material/table';
import {T} from '../../shared/models/t';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

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
    private snakeBar: MatSnackBar,
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
        this.snakeBar.open('删除成功', undefined, {duration: 2000});
      });
    }
  }

  ngAfterViewInit(): void {
  }

}
