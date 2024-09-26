import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { AddEmployeeFormComponent } from '../create-form/create-form.component';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { TableModule } from 'primeng/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
import { color } from 'html2canvas/dist/types/css/types/color';
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
  departmentId!: number;
  // @Input() departName:string | undefined;
  departName!:string;
  employees: any[] = [];
  @Input() isModalOpen: boolean = false;
  selectedEmployeeId: number | undefined;
  selectedDepartmentId: number | undefined;
  isEditFormVisible: boolean = false;
  @Output() employeeAdded = new EventEmitter<any>();

  rows = 5;

  filteredEmployees: Employee[] = [];

  searchTerm: string = '';
  departments: Department[] = [];

  ngOnInit() {
    this.departmentId =+ this.root.snapshot.paramMap.get('id')!;
    this.loadEmployees();
  
    // this.departName=departments[name];
   
    console.log(this.departName);

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


  constructor(private employeeService: EmployeeService, private router: Router, private root: ActivatedRoute,private homeService:HomeService) {

  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentId'] && this.departmentId) {
      this.loadEmployees();
      // this.loadDepartment();
    }
  }

  loadEmployees() {
    this.loadDepartment();
    this.employeeService.getEmployeesByDepartment(this.departmentId)
      .subscribe(data => {
        this.employees = data;
        this.filteredEmployees = data;
      });
  }
  loadDepartment()
  {
    console.log('call', this.departmentId);
    if(this.departmentId){
       this.employeeService.getDepartmentName(this.departmentId).subscribe(
        (response)=>{
          console.log('name');
          this.departName= response.name;
          console.log(this.departName)
        },
        (error)=>{
          this.departName='';
        }
       )
    }
    
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
  deleteEmployeeList(employeeId: number) {
    this.deleteEmployee(employeeId);
  }
  // deleteEmployee(departmentId: number) {
  //   if (confirm('Are you sure you want to delete this department?')) {
  //     this.employeeService.deleteDepartment(departmentId).subscribe({
  //       next: () => {
  //         this.employees = this.employees.filter(employee => employee.id !== departmentId);
  //         console.log('Employee deleted:', departmentId);
  //       },
  //       error: (error) => {
  //         console.error('Error deleting department:', error);
  //       }
  //     });
  //   }
  // }
  gotoEdit(id: number) {
    // console.log('Navigating to edit:', id, deptId);
    this.router.navigate(['employee/edit', id]);
  }
  deleteEmployee(departmentId: number) {
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
