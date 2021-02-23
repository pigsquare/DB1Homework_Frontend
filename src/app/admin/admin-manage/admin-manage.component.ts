import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../../shared/services/admin.service';
import {Admin} from '../../shared/models/admin';
import {AdminAddRequest} from '../../shared/models/admin-add-request';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.scss']
})
export class AdminManageComponent implements OnInit {

  dataSource: MatTableDataSource<Admin>;
  displayedColumns: string[] = ['id', 'name', 'password', 'edit'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAdmin();
  }
  getAdmin(): void{
    this.adminService.getAdmin().subscribe(r => {
      this.dataSource = new MatTableDataSource<Admin>(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  delAdmin(dalA: Admin): void{
    if (confirm('Are you sure to delete ' + dalA.name + '?')){
      this.adminService.delAdmin(dalA.id).subscribe(r => {
        this.getAdmin();
        this.snackBar.open('删除成功', undefined, {duration: 2000});
      });
    }
  }
  addAdmin(): void{
    const dialogRef = this.dialog.open(AddAdminDialogComponent, {
      width: '300px',
      data: new AdminAddRequest()
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r){
        this.adminService.addAdmin(r).subscribe(() => {
          this.snackBar.open('添加成功', undefined, {duration: 2000});
          this.getAdmin();
        }, () => {
          this.snackBar.open('添加失败', undefined, {duration: 2000});
        });
      }
    });
  }

}

@Component({
  selector: 'app-admin-add-dialog',
  templateUrl: './admin-add-dialog.html'
})
export class AddAdminDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminAddRequest
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
