import { Routes } from '@angular/router';
import { CommunityComponent } from './pages/community/community.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./core/layout/layout.component').then(c => c.LayoutComponent),
        children: [
            {
                path: '',
                component: HomePageComponent
            },
            {
                path: 'blog',
                component: BlogComponent
            }
        ]
    },
];
