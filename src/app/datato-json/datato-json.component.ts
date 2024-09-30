import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileuploadserviceService } from './fileuploadservice.service';

@Component({
  selector: 'app-datato-json',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './datato-json.component.html',
  styleUrl: './datato-json.component.css'
})
export class DatatoJsonComponent {
  message: string = '';
  selectedFile: File | null = null; // Variable to hold the selected file

  constructor(private departmentService: FileuploadserviceService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Store the selected file
  }

  onSubmit() {
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile); // Call uploadFile with the selected file
    } else {
      this.message = 'Please select a file first.';
    }
  }

  uploadFile(file: File) {
    this.departmentService.uploadJsonFile(file).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        this.message = `Error uploading file: ${error.error.error}`;
      }
    );
  }
 }
