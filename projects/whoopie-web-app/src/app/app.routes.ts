import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./core/layout/layout.component').then(c => c.LayoutComponent)
    },
    {
        path:'about',
        loadComponent: () => import('./core/layout/layout.component').then(c => c.LayoutComponent)
    },
    {
        path:'home',
        loadComponent: () => import('./core/layout/layout.component').then(c => c.LayoutComponent)
    },
    {
        path:'services',
        loadComponent: () => import('./core/layout/layout.component').then(c => c.LayoutComponent)
    },
    {
        path:'contact',
        loadComponent: () => import('./core/layout/layout.component').then(c => c.LayoutComponent)
    },

];
