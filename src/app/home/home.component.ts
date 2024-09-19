import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, NgModule, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../service/home.service';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeListComponent } from '../component/employee-list/employee-list.component';
import { AddEmployeeFormComponent } from '../component/create-form/create-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule,EmployeeListComponent,AddEmployeeFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  departments: Department[] = [];
  constructor(private homeService: HomeService,private http: HttpClient) { }
  
  selectedDepartmentId: number | undefined;
  showForm: boolean = false; 
  isModalOpen:boolean=false;

  openEmployeeList(departmentId: number | undefined) {
    this.selectedDepartmentId = departmentId;
    this.isModalOpen=true;
    this.showForm = false;
  }

  ngOnInit(): void {
    this.homeService.getEmployees().subscribe((data: Department[]) => {
      this.departments = data;
    });
  }

  openEmployeeForm(departmentId: number|undefined) {
    this.selectedDepartmentId = departmentId;
    this.showForm = true;
    this.isModalOpen=false;
    // alert("new form")
  }

  handleEmployeeAdded(employeeData: any) {
    console.log('New Employee Data:', employeeData);
    this.showForm = false;
  }
  // toggleForm(): void {
  //   this.showForm = !this.showForm;
  // }

  // toggle():void{
  //   this.isModalOpen= !this.isModalOpen;
  // }
 

}
