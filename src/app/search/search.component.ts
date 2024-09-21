import { Component } from '@angular/core';
import { SearchService } from '../service/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  departments:any[]=[];
  filteredEmployees: any[] = [];
  searchTerm: string = '';


  constructor(private searchService:SearchService){}
  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees() {
    this.searchService.getEmployeesAndDepartment()
      .subscribe(data => {
        this.departments = data;
      });
  }

  onSearch() {
    this.loadEmployees();
    if (this.searchTerm) {
      this.filteredEmployees = [];
  
      this.departments.forEach(department => {
        const matchingEmployees = department.employees.filter((employee: any) =>
          employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
          employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        
        if (matchingEmployees.length > 0) {
          this.filteredEmployees.push({
            departmentName: department.name,
            employees: matchingEmployees
          });
        }
      });
    } else {
      this.filteredEmployees = this.departments; // Reset to original list if search term is empty
    }
  }
  
}
