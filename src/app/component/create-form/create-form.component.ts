import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmailValidatorDirective } from '../../validators/email-validator.directive';
import { MobileValidatorDirective } from '../../validators/mobile-validator.directive';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,EmailValidatorDirective,MobileValidatorDirective]
})
export class AddEmployeeFormComponent {
  form: FormGroup;
  @Input() employee: any = null;
  @Output() employeeAdded = new EventEmitter<any>();
  departId!: string;
  departmentId?: string;
  isEditMode = false;
  employeeId!: string;


  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private route: ActivatedRoute, private root: Router) {
    this.form = this.fb.group({
      employee: this.fb.group({
        id:['',Validators.required],
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
      this.departId = params['id'];
    });
    if (this.employeeId) {
      this.isEditMode = true;
      this.employeeService.getEmployee(this.employeeId).subscribe((employee: any) => {
        this.form.patchValue({
          employee: {
            id:this.employeeId,
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
  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'department added successful',
      showConfirmButton: false,
      timer: 4000
    });
  }

  showSuccessUpdate() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'employee Update successful',
      showConfirmButton: false,
      timer: 4000
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId,
        {
          ...this.form.value.employee
        }).subscribe(
          (res) => {
            this.showSuccessUpdate()
            this.root.navigate(['/employeelist']);
          }, error => {
            console.error('error', error);
          }

        )
    }
    else {
      this.employeeService.addEmployee(this.departId, this.form.value.employee).subscribe(
        (res) => {
          this.showSuccessAlert();
        }, error => {
          console.error('error', error)
        }
      )
    }
    this.root.navigate(['/employeeList', this.departId]);
    this.employeeAdded.emit(null);
  }
  back() {
    this.root.navigate(['/department'])
  }
}
