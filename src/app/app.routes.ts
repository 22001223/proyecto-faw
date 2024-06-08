import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { CreateComponent } from './components/create/create.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: LayoutComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/login'])),
        children: [
            {
                path: 'tasks',
                component: ListComponent
            },
            {
                path: 'create-task',
                component: CreateComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
