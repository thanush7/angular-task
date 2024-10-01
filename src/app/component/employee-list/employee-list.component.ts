import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { AddEmployeeFormComponent } from '../create-form/create-form.component';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { TableModule } from 'primeng/table';
import {MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HomeService } from '../../service/home.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule, AddEmployeeFormComponent, FormsModule, TableModule, MatPaginatorModule, MatPaginatorModule]
})
export class EmployeeListComponent implements OnChanges {
  // @Input() departmentId!: number;
  departmentId!: string;
  // @Input() departName:string | undefined;
  departName!:string;
  employees: any[] = [];
  @Input() isModalOpen: boolean = false;
  selectedEmployeeId: string | undefined;
  selectedDepartmentId: string | undefined;
  isEditFormVisible: boolean = false;
  @Output() employeeAdded = new EventEmitter<any>();

  // rows = 5;
  totalRecords: number = 0;

  filteredEmployees: Employee[] = [];
  loading: boolean = true;
  searchTerm: string = ''; 
  page: number = 0;
  rows: number = 4;
  sortField: string = 'id';
  sortOrder: number = 1;
  departments: Department[] = [];

  ngOnInit() {
    this.departmentId = this.root.snapshot.paramMap.get('id')!;
    this.loadEmployees();
  }

  constructor(private employeeService: EmployeeService, private router: Router, private root: ActivatedRoute,private homeService:HomeService) {

  }



  onSearch() {
    this.page = 0; 
    this.loadEmployees();
  }

  onSortChange(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order;
    this.loadEmployees();
  }


 


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentId'] && this.departmentId) {
    }
  }

  loadEmployees() {
    this.loadDepartment();
    this.loading = true;
    this.employeeService.getEmployeesByDepartment(this.departmentId,this.page, this.rows,this.searchTerm,this.sortField,this.sortOrder)
      .subscribe((data:any) => {
        this.employees = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
  }
  onPageChange(event: any): void {
    this.page = event.first / event.rows; 
     this.rows = event.rows; 
    this.loadEmployees();
  }
  loadDepartment()
  {
    if(this.departmentId){
       this.employeeService.getDepartmentName(this.departmentId).subscribe(
        (response)=>{
          this.departName= response.name;
        },
        (error)=>{
          this.departName='';

        }
       )
    }
    
  }

  editEmployee(employeeId: string, departId: string) {
    this.selectedEmployeeId = employeeId;
    this.selectedDepartmentId = departId;
    this.isEditFormVisible = true; 
  }

  onEmployeeUpdated(updatedEmployee: any) {
    this.loadEmployees();
    this.isEditFormVisible = false;  
  }
  deleteEmployeeList(employeeId: string) {
    this.deleteEmployee(employeeId);
  }

  gotoEdit(id: number) {
    this.router.navigate(['employee/edit', id]);
  }
  deleteEmployee(departmentId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteDepartment(departmentId).subscribe({
          next: () => {
            this.employees = this.employees.filter(employee => employee.id !== departmentId);
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error deleting department:', error);
          }
        });

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['/department']);
  }
  title = 'frontend';
}
