export class DepartmentEmployeeRequest {
    departmentId:string;
    page:number;
    size:number;
  constructor(departmentId:string,page:number,size:number){
    this.departmentId=departmentId;
    this.page=page;
    this.size=size;
  }
}