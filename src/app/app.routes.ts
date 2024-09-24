import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './department/create/create.component';
import { SearchComponent } from './search/search.component';
import { DepartmenteditComponent } from './departmentedit/departmentedit.component';
import { AddEmployeeFormComponent } from './component/create-form/create-form.component';

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
        path: 'employee/edit/:id',
        component: AddEmployeeFormComponent
    }
];
