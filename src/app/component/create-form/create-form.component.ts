import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddEmployeeFormComponent {
  form: FormGroup;
  @Input() employee: any = null;
  @Output() employeeAdded = new EventEmitter<any>();
  @Input() departId!: number;
  isEditMode = false
  employeeId!: number
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      employee: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', Validators.required],
        gender: ['', Validators.required],
        city: ['', Validators.required],
      }),

      department: this.fb.group({
        id: ['']
      })
    });
  }
  ngOnInit() {
    if (this.employee) {
      this.isEditMode = true;
      // Directly set form values for the employee
      this.form.patchValue({
        employee: {
          name: this.employee.name || '',
          email: this.employee.email || '',
          mobile: this.employee.mobile || '',
          gender: this.employee.gender || '',
          city: this.employee.city || '',
        },
        department: {
          id: this.employee.departmentId || '', // Adjust this based on your data structure
        }
      });
    }
    else {
      this.employeeId = +this.route.snapshot.paramMap.get('id')!;
      if (this.employeeId) {
        this.isEditMode = true;
        this.employeeService.getEmployeeById(this.employeeId).subscribe((employee: any) => {
         console.log(employee)
          this.form.patchValue({
            employee: {
              name: employee.name || '',
              email: employee.email || '',
              mobile: employee.mobile || '',
              gender: employee.gender || '',
              city: employee.city || '',
            },
            department: {
              id: employee.departmentId || '', 
            }
          });
        });
      }
    }
  }


  onSubmit() {
    alert("called submit");
    console.log('Form valid:', this.form.valid);
    console.log('Form controls:', this.form.controls);
    console.log('Department ID:', this.departId);
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId,this.form.value.employee).subscribe(
        (res)=>{this.employeeAdded.emit(res);
          alert('updated successfully')
        },error=>{
          console.error('error',error);
        }
        
      )
    }
    else{
      this.employeeService.addEmployee(this.departId,this.form.value.employee).subscribe(
        (res)=>{
          this.employeeAdded.emit(res);
          console.log('added succes',res);
        },error=>{
          console.error('error',error)
        }
      )
    }
    this.employeeAdded.emit(null);
  }
}
