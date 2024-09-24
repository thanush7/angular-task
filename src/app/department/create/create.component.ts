import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { Department } from '../../models/department.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,RouterOutlet],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private service:EmployeeService){}

  isEdit = false;

  newDepartment: any = {
    name: '',
    employees: [{ name: '', email: '', mobile: '' }],
  };

  onSubmit(Department:any){

    if(this.isEdit){
      this.service.updateDepartment(Department.id,Department).subscribe({
        next:()=>{
          alert("department updated successfully");
        },
        error:(error)=>{
          console.log('error updating department',error);
        }
      })
    }
    else{
       this.service.createDepartementWithEmployee(Department).subscribe(
      {
        next:(respone)=>{
          alert("added successfully");
          window.location.reload();
        }
        
      }
      
    )
    }

  }

  loadDepartmentForEdit(departmentId: number) {
    this.service.getDepartmentById(departmentId).subscribe((data) => {
      // this.newDepartment = data;
      this.newDepartment=data;
      this.isEdit = true;
    });
  }

  resetForm(){
    this.newDepartment={
      name:'',
      employees:[{
        name: '', email: '', mobile: '',
      }]
    }
  }

  addEmployee() {
    this.newDepartment.employees.push({
      name: '', email: '', mobile: '',
    }
  )
  }
  removeEmployee(index: number) {
    this.newDepartment.employees.splice(index, 1);
  }
}
