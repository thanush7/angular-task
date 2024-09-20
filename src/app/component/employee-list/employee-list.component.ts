import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { AddEmployeeFormComponent } from '../create-form/create-form.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule,AddEmployeeFormComponent] 
})
export class EmployeeListComponent implements OnChanges {
  @Input() departmentId!: number;
  employees: any[] = [];
  @Input() isModalOpen: boolean = false;
  selectedEmployeeId: number | undefined;
  selectedDepartmentId: number | undefined;
  isEditFormVisible: boolean=false;
  

  constructor(private employeeService: EmployeeService) {}

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


  

  closeModal() {
    this.isModalOpen = false;
  }
}
