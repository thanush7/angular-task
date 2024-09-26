import { Employee } from "./employee.model";

export class Department {
    id?:string;
    name:string | undefined
    employees:Employee[]=[];
}
