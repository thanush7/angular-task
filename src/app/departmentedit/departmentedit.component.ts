import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmenteditService } from './departmentedit.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departmentedit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './departmentedit.component.html',
  styleUrl: './departmentedit.component.css'
})
export class DepartmenteditComponent {
  @Input() department:any;
  @Output() departmentAdded=new EventEmitter<any>();
  form!:FormGroup;
  isEditMode:boolean=false;
  departmentId!: string;

  constructor(private fb:FormBuilder,private service:DepartmenteditService,private route: ActivatedRoute,private root:Router){}

  ngOnInit(){
    this.initForm();
    this.departmentId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.departmentId);
    if(this.departmentId){
      this.isEditMode = true;
      this.service.getDeparmentById(this.departmentId)
      .subscribe((department: any) => {
        this.form.patchValue({
          department: {
            id:department.id,
            name: department.name 
          }
      });
        
        // alert(department.name)
      });
    }

  }

  initForm(){
    this.form=this.fb.group({
      department:this.fb.group({
        id:['',Validators.required],
        name:['',Validators.required],
      })
    })
  }

  // populateForm(department:any){
  //   this.form.patchValue({name:department.name||''}
  //   )
  // }
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
      text: 'department Updated successful',
      showConfirmButton: false,
      timer: 2000
    });
  }
  onSubmit(){
  //  alert('called 1')
    if(this.isEditMode){
      // alert('called 2')
      const updatedDepartment={
        id: this.departmentId,
        ...this.form.value.department
      };
      this.service.updateDeparment(updatedDepartment.id,updatedDepartment).subscribe((res)=>{
        this.departmentAdded.emit(res); // Emit the new department to parent component
        // console.log('Department updated successfully', res);
        this.showSuccessUpdate();
        this.closeForm();
      },
      (error) => {
        // Handle error response
        console.error('Error updating department:', error);
      });
    }
    else{
      // alert('called 3')
      const newDepartment={...this.form.value.department};
      this.service.addDepartment(newDepartment).subscribe(
        (response) => {
          // Handle success response
          this.departmentAdded.emit(response); // Emit the new department to parent component
          this.showSuccessAlert();
          this.closeForm();
        },
        (error) => {
          // Handle error response
          console.error('Error creating department:', error);
        }
      );
    }
    
    this.closeForm();
  }

  closeForm(){
    this.root.navigate(['/department'])
  }

}
