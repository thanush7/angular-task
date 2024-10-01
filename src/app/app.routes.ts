import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DepartmenteditComponent } from './departmentedit/departmentedit.component';
import { AddEmployeeFormComponent } from './component/create-form/create-form.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { DatatoJsonComponent } from './datato-json/datato-json.component';
import { CreateComponent } from './department/create.component';

export const routes: Routes = [
    {
        path: 'department',
        component: HomeComponent
    },
    {
        path: 'addall',
        component: CreateComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'editdepartment',
        component: DepartmenteditComponent
    },
    {
        path: 'departments/edit/:id',
        component: DepartmenteditComponent
    },
    {
        path: 'employee/edit/:employeeId',
        component: AddEmployeeFormComponent
    },
    {
        path:'employeeList/:id',
        component:EmployeeListComponent
    }
    ,{
      path:'employeeList',
      component:HomeComponent
    }
    ,{
        path:'create/:id',
        component:AddEmployeeFormComponent
    },{
        path:'json',
        component:DatatoJsonComponent
    }

];
