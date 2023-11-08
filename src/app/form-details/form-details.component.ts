import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent {
  dataSource = new MatTableDataSource<any>(); 
  displayedColumns: string[] = ['id', 'name', 'location', 'email'];

  data = [
    { id: 1, name: 'John',    location: 'Bangalore', email: 'john@gmail.com' },
    { id: 2, name: 'Doe',     location: 'Chennai', email: 'doe@gmail.com' },
    { id: 3, name: 'Chan',    location: 'Kolar', email: 'chan@gmail.com' },
    { id: 4, name: 'Dhanya',  location: 'Chennai', email: 'dhanya@gmail.com' },
    { id: 5, name: 'kim',     location: 'Tirchi', email: 'kim@gmail.com' },
    { id: 6, name: 'Kishore', location: 'Bangalore', email: 'kishore@gmail.com' }
  ];

  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild('input') input: any; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  
  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
}
