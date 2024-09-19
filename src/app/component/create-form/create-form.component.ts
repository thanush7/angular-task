import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule] 
})
export class AddEmployeeFormComponent {
  form: FormGroup;
  @Output() employeeAdded = new EventEmitter<any>();
  @Input() departmentId!: number;
  constructor(private fb: FormBuilder,private employeeService:EmployeeService) {
    this.form = this.fb.group({
      employee: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', Validators.required],
      }),
      department: this.fb.group({
        id: ['']
      })
    });
  }

  onSubmit() {
    alert("called submit");
    if (this.form.valid && this.departmentId) {
      // Set the department ID before making the API call
      alert("called submit1");
      this.form.patchValue({ department: { id: this.departmentId } });

      // Call the service method and pass the department ID and employee data
      this.employeeService.addEmployee(this.departmentId, this.form.value.employee).subscribe({
        next: (response) => {
          // Emit the event on successful submission
          this.employeeAdded.emit(response);
          // Reset the form
          this.form.reset();
        },
        error: (error) => {
          console.error('Error adding employee:', error); // Handle errors
        }
      });
    }
  }
}
