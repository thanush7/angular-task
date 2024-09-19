import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class EmployeeListComponent implements OnChanges {
  @Input() departmentId!: number;
  employees: any[] = [];
  @Input() isModalOpen: boolean = false;
  

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

  closeModal() {
    this.isModalOpen = false;
  }
}
