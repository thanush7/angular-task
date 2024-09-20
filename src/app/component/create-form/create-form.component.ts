import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddEmployeeFormComponent {
  form: FormGroup;
  @Output() employeeAdded = new EventEmitter<any>();
  @Input() departId!: number;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
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
    console.log('Form valid:', this.form.valid);
    console.log('Form controls:', this.form.controls);
    console.log('Department ID:', this.departId);
    if (this.form.valid && this.departId) {
      alert("called submit1");
      this.form.patchValue({ department: { id: this.departId } });
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
