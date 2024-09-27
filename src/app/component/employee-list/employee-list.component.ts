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
  departmentId!: string;
  // @Input() departName:string | undefined;
  departName!:string;
  employees: any[] = [];
  @Input() isModalOpen: boolean = false;
  selectedEmployeeId: string | undefined;
  selectedDepartmentId: string | undefined;
  isEditFormVisible: boolean = false;
  @Output() employeeAdded = new EventEmitter<any>();

  rows = 5;
  totalRecords: number = 0;

  filteredEmployees: Employee[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  departments: Department[] = [];

  ngOnInit() {
    this.departmentId = this.root.snapshot.paramMap.get('id')!;
    this.loadEmployees(0,4);
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
      // this.loadEmployees(0,this.rows);
      // this.loadDepartment();
    }
  }

  loadEmployees(page: number, size: number) {
    this.loadDepartment();
    this.loading = true;
    this.employeeService.getEmployeesByDepartment(this.departmentId,page, size)
      .subscribe((data:any) => {
        this.employees = data.content;
        this.filteredEmployees = data.content;
        this.totalRecords = data.totalElements;
        console.log(data);
        this.loading = false;
      });
  }
  onPageChange(event: any): void {
    const page = event.first / event.rows; // Calculate the current page
    const size = event.rows; // Get the number of records per page
    this.loadEmployees(page, size);
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

  editEmployee(employeeId: string, departId: string) {
    this.selectedEmployeeId = employeeId;
    this.selectedDepartmentId = departId;
    this.isEditFormVisible = true; // Show the form when an employee is selected
  }

  onEmployeeUpdated(updatedEmployee: any) {
    console.log('Employee updated:', updatedEmployee);
    // Refresh the employee list or update the view
    this.loadEmployees(0,4);
    this.isEditFormVisible = false;  // Hide the form after updating
  }
  deleteEmployeeList(employeeId: string) {
    this.deleteEmployee(employeeId);
  }

  gotoEdit(id: number) {
    // console.log('Navigating to edit:', id, deptId);
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
            this.loadEmployees(0,4);
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
