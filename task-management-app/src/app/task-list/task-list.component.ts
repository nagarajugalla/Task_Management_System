import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'description', 'status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  filterCompleted: boolean = false;
  statusValue:boolean=true;
  tableData:any;
  showTable=false;
  @ViewChild(MatPaginator) paginator:any= MatPaginator;


  constructor(private taskService: TaskService,private dialog:MatDialog) {
  }

  ngOnInit(){
    let data:any = localStorage.getItem('tasksList');
    if(data){
      data = JSON.parse(data);
      console.log("get from local",data)
      this.dataSource = new MatTableDataSource(data);
      this.tableData = this.dataSource.filteredData;
      this.showTable=true;
    }

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addTask(){
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '560px',
      height: '560px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        let data:any = this.dataSource.filteredData;
        data.push(resp);
        localStorage.setItem('tasksList',JSON.stringify(data));
        this.tableData = this.dataSource.filteredData;
        this.dataSource = new MatTableDataSource(data);
        this.showTable =true;
      }
    });
  }
  dropdownChange(event:any){
    this.showTable =false;
    let originalData:any = this.tableData;
    if(event.value == 'true'){
      originalData = originalData.filter((el:any)=> el.status == true);
    }else{
      originalData = originalData.filter((el:any)=> el.status == false);
    }
    this.dataSource = new MatTableDataSource(originalData);
    this.showTable =true;
  }
}

