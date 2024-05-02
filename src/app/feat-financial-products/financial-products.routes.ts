import { Route } from "@angular/router";
import { ProductsComponent } from "./smart-components/products/products.component";
import { ProductsAddComponent } from "./smart-components/products-add/products-add.component";

export const financialProductsRoutes: Route[] = [
    {
        path: '',
        component: ProductsComponent
   
    },
    {
        path: 'add',
        component: ProductsAddComponent
    }
]