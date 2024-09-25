import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../models/department.model';

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
  departmentId?:number;
  isEditMode = false
  employeeId!: number
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private route: ActivatedRoute,private root:Router) {
    this.form = this.fb.group({
      employee: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', Validators.required],
        gender: ['', Validators.required],
        city: ['', Validators.required],
      }),
    });
  }
  ngOnInit() {
  
    this.route.params.subscribe(params => {
      this.employeeId = params['employeeId'];
    });
      if (this.employeeId) {
        console.log('inside')
        console.log(this.departmentId);
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
          });
        });
      }
  }


  onSubmit() {
    alert("called submit");
    console.log('Form valid:', this.form.valid);
    console.log('Form controls:', this.form.controls);
    console.log('Department ID:', this.departId);
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId,
        {...this.form.value.employee
        }).subscribe(
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
    this.root.navigate(['/employeelist']);
    this.employeeAdded.emit(null);
  }
}
