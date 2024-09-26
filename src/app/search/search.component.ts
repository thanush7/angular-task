import { Component } from '@angular/core';
import { SearchService } from '../service/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterLink,TableModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  departments:any[]=[];
  filteredEmployees: any[] = [];
  searchTerm: string = '';


  constructor(private searchService:SearchService){}
  ngOnInit(): void {
    this.loadEmployees();
    // this.onSearch();
  }
  loadEmployees() {
    this.searchService.getEmployeesAndDepartment()
      .subscribe(data => {
        this.departments = data;
        this.filteredEmployees=data;
      });
  }
  downloadPDF() {
    // Capture the table div as a PDF
    const data = document.getElementById('pdfTable');  // ID of the container div
    html2canvas(data!).then((canvas) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('employees-departments.pdf'); // Save the PDF
    });
  }

  exportToExcel(): void {
    // Create a new workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Convert departments data to worksheet
    const departmentData = this.departments.map(department => ({
      'Department ID': department.id,
      'Department Name': department.name
    }));
    const departmentWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(departmentData);
    XLSX.utils.book_append_sheet(workbook, departmentWorksheet, 'Departments');

    // Convert employees data to a separate worksheet
    const employeeData = this.departments.flatMap(department =>
      department.employees.map((employee: { id: any; name: any; email: any; }) => ({
        'Employee ID': employee.id,
        'Employee Name': employee.name,
        'Employee Email': employee.email,
        'Department ID': department.id,
        'Department Name': department.name
      }))
    );
    const employeeWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employeeData);
    XLSX.utils.book_append_sheet(workbook, employeeWorksheet, 'Employees');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'departments-employees.xlsx');
  }

  onSearch() {
    // this.loadEmployees();
    if (this.searchTerm) {
      this.filteredEmployees = [];
  
      this.departments.forEach(department => {
        const matchingEmployees = department.employees.filter((employee: any) =>
          employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
          employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        
        if (matchingEmployees.length > 0) {
          this.filteredEmployees.push({
            id:department.id,
            name: department.name,
            employees: matchingEmployees
          });
        }
      });
    } else {
      this.filteredEmployees = this.departments;
    }
  }
  
}
