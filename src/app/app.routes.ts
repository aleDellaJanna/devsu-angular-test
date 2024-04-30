import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./feat-financial-products/financial-products.routes').then(mod => mod.financialProductsRoutes)
    }
];
