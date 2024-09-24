import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { AddEmployeeFormComponent } from '../create-form/create-form.component';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { TableModule } from 'primeng/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule,AddEmployeeFormComponent,FormsModule,TableModule,MatPaginatorModule,MatPaginatorModule] 
})
export class EmployeeListComponent implements OnChanges {
  @Input() departmentId!: number;
  @Input() departName:string | undefined;
  employees: any[] = [];
  @Input() isModalOpen: boolean = false;
  selectedEmployeeId: number | undefined;
  selectedDepartmentId: number | undefined;
  isEditFormVisible: boolean=false;

  rows = 4;

  filteredEmployees:Employee[]=[];

  searchTerm: string = '';

  ngOnInit(){
    this.loadEmployees();
  }
 
  onSearch() {
    if (this.searchTerm) {
      this.filteredEmployees = this.employees.filter(emp =>
        emp.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEmployees = [...this.employees];
    }
  }


  constructor(private employeeService: EmployeeService,private router:Router) {
  
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentId'] && this.departmentId) {
      this.loadEmployees();
    }
  }

  loadEmployees() {
    this.employeeService.getEmployeesByDepartment(this.departmentId)
      .subscribe(data => {
        this.employees = data;
        this.isModalOpen = true;
        this.filteredEmployees=data;
      });
  }

  editEmployee(employeeId: number, departId: number) {
    this.selectedEmployeeId = employeeId;
    this.selectedDepartmentId = departId;
    this.isEditFormVisible = true; // Show the form when an employee is selected
  }

  onEmployeeUpdated(updatedEmployee: any) {
    console.log('Employee updated:', updatedEmployee);
    // Refresh the employee list or update the view
    this.loadEmployees();
    this.isEditFormVisible = false;  // Hide the form after updating
  }
  deleteEmployeeList(employeeId: number){
    this.deleteEmployee(employeeId);
  }
  deleteEmployee(departmentId: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.employeeService.deleteDepartment(departmentId).subscribe({
        next: () => {
          this.employees = this.employees.filter(employee => employee.id !== departmentId);
          console.log('Employee deleted:', departmentId);
        },
        error: (error) => {
          console.error('Error deleting department:', error);
        }
      });
    }
  }
  gotoEdit(id:number){
    this.router.navigate(['employee/edit',id])
  }

  closeModal() {
    this.isModalOpen = false;
  }
  title = 'frontend';
}
