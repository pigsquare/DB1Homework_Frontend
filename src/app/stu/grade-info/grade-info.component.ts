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
import * as charts from 'echarts';

@Component({
  selector: 'app-grade-info',
  templateUrl: './grade-info.component.html',
  styleUrls: ['./grade-info.component.scss']
})
export class GradeInfoComponent implements OnInit {
  constructor(
    private cService: CourseService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private scService: ScService,
  ) { }

  creditGet = 0;
  avgPoint = 0;
  totalCredit = 0;
  avgScore = 0;
  dataSource: MatTableDataSource<CourseTokenResponse>;
  displayedColumns: string[] = ['cno', 'cname', 'credit', 'grade', 'point'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  static initCharts(data: CourseTokenResponse[]): void {
    const ec = charts as any;
    const lineChart = ec.init(document.getElementById('g2_c1'));
    const xData = [];
    const yData = [];
    for (const element of data){
      xData.push(element.cname);
      yData.push(element.grade);
    }
    const lineChartOption = {
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: yData,
        type: 'bar',
        itemStyle: {
          normal: {
            label: {
              show: true, // 开启显示
              position: 'top', // 在上方显示
              textStyle: { // 数值样式
                color: 'black',
                fontSize: 16
              }
            }
          }
        },
        // barWidth: 20,
      }]
    };
    lineChart.setOption(lineChartOption);
  }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void{
    this.cService.getGradedC().subscribe(r => {
      this.dataSource = new MatTableDataSource<CourseTokenResponse>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      GradeInfoComponent.initCharts(this.dataSource.data);
      this.totalCredit = this.avgPoint = 0;
      this.creditGet = this.avgScore = 0;
      let totalScore = 0;
      let totalPoint = 0;
      for (const element of this.dataSource.data){
        if (element.grade >= 60){
          this.creditGet += element.credit;
          totalPoint += element.point * element.credit;
        }
        this.totalCredit += element.credit;
        totalScore += element.grade * element.credit;
      }
      if (this.totalCredit !== 0){
        this.avgPoint = totalPoint / this.totalCredit;
        this.avgScore = totalScore / this.totalCredit;
      }
    });
  }

}
