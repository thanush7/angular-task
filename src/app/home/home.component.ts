import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, NgModule, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../service/home.service';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeListComponent } from '../component/employee-list/employee-list.component';
import { AddEmployeeFormComponent } from '../component/create-form/create-form.component';
import { CreateComponent } from '../department/create/create.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule,EmployeeListComponent,AddEmployeeFormComponent,CreateComponent,RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  departments: Department[] = [];
  constructor(private homeService: HomeService,private http: HttpClient) { }
  selectedDepartmentId: number | undefined;
  showForm: boolean = false; 
  isModalOpen:boolean=false;
  selectedId!:number;
  createForm:boolean=false;

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

  deleteEmployeeList(DepartmentId:number){
    this.deleteDepartment(DepartmentId);
  }

  openEmployeeForm(departmentId:number) {
    this.selectedId = departmentId;
    this.showForm = true;
    this.isModalOpen=false;
    // alert("new form")
  }

  handleEmployeeAdded(employeeData: any) {
    console.log('Employee added for department:', this.selectedDepartmentId, employeeData);
    this.showForm = false;
  }

  isOpen():void{
    this.createForm=true;
  }

  deleteDepartment(departmentId: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.homeService.deleteDepartment(departmentId).subscribe({
        next: () => {
          this.departments = this.departments.filter(department => department.id !== departmentId);
          console.log('Department deleted:', departmentId);
        },
        error: (error) => {
          console.error('Error deleting department:', error);
        }
      });
    }
  }


 

}
