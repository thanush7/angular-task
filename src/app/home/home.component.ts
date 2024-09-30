import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, NgModule, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../service/home.service';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeListComponent } from '../component/employee-list/employee-list.component';
import { AddEmployeeFormComponent } from '../component/create-form/create-form.component';
import { CreateComponent } from '../department/create/create.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule,EmployeeListComponent,CreateComponent,RouterLink,RouterOutlet,TableModule,AddEmployeeFormComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  departments: Department[] = [];
  constructor(private homeService: HomeService,private http: HttpClient,private router:Router) { }
  selectedDepartmentId: FunctionStringCallback | undefined;
  showForm: boolean = false; 
  isModalOpen:boolean=false;
  selectedId!:string;
  createForm:boolean=false;
  departmentName="";
  filteredDepartment:Department[]=[];
  row=5;
  totalRecords:number=0;
  loading:boolean=false;
  searchTerm: string = '';
  page: number = 0;
  size: number = 4;
  sortBy: string = 'name';
  direction: string = 'ASC';

  // openEmployeeList(departmentId: number | undefined,departName:string) {
  //   this.selectedDepartmentId = departmentId;
  //   this.departmentName=departName;
  //   this.isModalOpen=true;
  //   this.showForm = false;
  // }

  ngOnInit(): void {
    // this.homeService.getEmployees().subscribe((data: Department[]) => {
    //   this.departments = data;
    //   this.filteredDepartment=data;
    // });
    this.loadDepartment();
  }
  onSearch(): void {
    this.page = 0; // Reset to the first page on new search
    this.loadDepartment();
  }
  loadDepartment(){
    this.loading = true;
    this.homeService.getEmployees(this.searchTerm, this.page, this.size, this.sortBy, this.direction)
      .subscribe((data:any) => {
        this.departments = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
  }
  onPageChange(event: any): void {
    const page = event.first / event.rows; // Calculate the current page
    const size = event.rows; // Get the number of records per page
    this.loadDepartment();
  }
  deleteEmployeeList(DepartmentId:string){
    this.deleteDepartment(DepartmentId);
  }

  openEmployeeForm(departmentId:string) {
    this.selectedId = departmentId;
    this.showForm = true;
    this.isModalOpen=false;
    // alert("new form")
    this.router.navigate(['/create',departmentId]);
  }

  handleEmployeeAdded(employeeData: any) {
    this.showForm = false;
  }

  isOpen():void{
    this.createForm=true;
  }

  deleteDepartment(departmentId: string) {
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
        this.homeService.deleteDepartment(departmentId).subscribe({
          next: () => {
            // this.departments = this.departments.filter(department => (department.id).trim().toLowerCase() !== departmentId);
            this.departments = this.departments.filter(department => department.id?.trim().toLowerCase() !== departmentId.trim().toLowerCase());
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

  gotoEdit(departId:number){
    this.router.navigate(['departments/edit',departId])
  }

  openEmployeeList(departId: number) {
    this.router.navigate(['/employeeList', departId]);
}

}
