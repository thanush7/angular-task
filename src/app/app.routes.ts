import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { CreateComponent } from './department/create/create.component';

export const routes: Routes = [
    {
        path:'department',
        component:HomeComponent
    },
    {
        path:'addall',
        component:CreateComponent
    }
];
