import { Route } from "@angular/router";
import { ProductsComponent } from "./smart-components/products/products.component";
import { ProductsAddComponent } from "./smart-components/products-add/products-add.component";
import { ProductsDetailComponent } from "./smart-components/products-detail/products-detail.component";

export const financialProductsRoutes: Route[] = [
    {
        path: '',
        component: ProductsComponent
   
    },
    {
        path: 'add',
        component: ProductsAddComponent
    },
    {
        path: ':id',
        component: ProductsDetailComponent
    }
]