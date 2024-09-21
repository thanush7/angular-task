import { Employee } from "./employee.model";

export class Department {
    id?:number;
    name:string | undefined
    employees:Employee[]=[];
}
