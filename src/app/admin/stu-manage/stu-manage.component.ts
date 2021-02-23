import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stu} from '../../shared/models/stu';
import {StuService} from '../../shared/services/stu.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatExpansionPanel} from '@angular/material/expansion';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-stu-manage',
  templateUrl: './stu-manage.component.html',
  styleUrls: ['./stu-manage.component.scss']
})
export class StuManageComponent implements OnInit, AfterViewInit{
  constructor(
    private http: HttpClient,
    private stuService: StuService,
    private formBuilder: FormBuilder,
    private snakeBar: MatSnackBar,
  ) {
    this.addForm = this.formBuilder.group({
      sno: ['', Validators.required],
      sname: ['', Validators.required],
      sex: [''],
      age: [''],
      sdept: [''],
      logn: ['', Validators.required],
      pswd: ['', Validators.required],
    });
    this.updateForm = this.formBuilder.group({
      sno: ['', Validators.required],
      sname: ['', Validators.required],
      sex: [''],
      age: [''],
      sdept: [''],
      logn: ['', Validators.required],
      pswd: ['', Validators.required],
    });
  }

  students: Stu[]|null;
  stu: Stu;
  addForm: FormGroup;
  updateForm: FormGroup;
  selected: boolean;
  panelOpenState = false;
  isText = new FormControl('', [Validators.required]);
  @ViewChild('sno') snoRef: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = ['sno', 'sname', 'age', 'sex', 'sdept', 'edit'];

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Stu>;
  @ViewChild('expansionPanel') expansionPanel: MatExpansionPanel;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getStu();
    this.selected = false;
    this.dataSource = new MatTableDataSource(this.students);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  getStu(): void{
    this.stuService.getStu().subscribe(r => {
      this.dataSource = new MatTableDataSource<Stu>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  getStuBySno(sno: number): void{
    // this.stuService.getOneStu(sno).subscribe(r => this.stu = r);
  }
  selectStu(selectedStu: Stu): void{
    this.stu = selectedStu;
    this.selected = true;
    this.updateForm.setValue({
      sno: selectedStu.sno,
      sname: selectedStu.sname,
      sex: selectedStu.sex,
      age: selectedStu.age,
      sdept: selectedStu.sdept,
      logn: selectedStu.logn,
      pswd: '',
    });
  }
  deleteStu(delStu: Stu): void{
    if (confirm('Are you sure to delete ' + delStu.sname + '?')){
      this.stuService.delStu(delStu.sno).subscribe(r => {
        this.getStu();
      });
    }
  }
  addSubmit(): void{
    if (this.addForm.valid)
    {
      this.stuService.addStu(this.addForm.value).subscribe(
        r => {
          this.getStu();
          this.addForm.reset();
          this.panelOpenState = false;
          console.log(r);
          this.expansionPanel.close();
          this.snakeBar.open('添加成功', undefined, {duration: 2000});
        }, (err: HttpErrorResponse) => {
          this.snakeBar.open('添加失败', undefined, {duration: 2000});
    });
    }
  }
  updateSubmit(): void{
    if (this.updateForm.valid){
      this.stuService.updateStu(this.updateForm.value).subscribe(
        r => {
        this.getStu();
        this.updateForm.reset();
        console.log(r);
        this.selected = false;
        this.snakeBar.open('修改成功', undefined, {duration: 2000});
      }, (err: HttpErrorResponse) => {
        this.snakeBar.open('修改失败', undefined, {duration: 2000});
      });
    }
  }
  getErrorMessage(): string {
    if (this.isText.hasError('required')) {
      return 'You must enter a value';
    }

    return this.isText.hasError('email') ? 'Not a valid email' : '';
  }

}
