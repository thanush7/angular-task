import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form: FormGroup;
  @Output() employeeAdded = new EventEmitter<any>();
  @Input() departId!: number;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.form = this.fb.group({
      department: this.fb.group({
        name: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    alert("called submit");
    console.log('Form valid:', this.form.valid);
    console.log('Form controls:', this.form.controls);
    console.log('Department ID:', this.departId);
    if (this.form.valid && this.departId) {
      alert("called submit1");
      this.employeeService.addEmployee(this.departId, this.form.value.employee).subscribe({
        next: (response) => {
          this.employeeAdded.emit(response);
          this.form.reset();
        },
        error: (error) => {
          console.error('Error adding employee:', error);
        }
      });
    }
  }
}
