import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { ProductFormComponent } from '../../ui-components/product-form/product-form.component';
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';
import { JsonPipe } from '@angular/common';
import { FinancialProduct } from '../../../type-database/financial-product.type';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [ProductFormComponent, JsonPipe],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsDetailComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly financialProductState= inject(FinancialProductsState);
  private readonly router = inject(Router)
  
  productId = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])));
  //I will use a bad practicse since there is NO GET product by ID endpoint.
  product = computed(()=>this.financialProductState.products().find(prod=>prod.id===this.productId()))


  constructor(){
    effect(()=>{
      if(!this.product()){
          this.router.navigateByUrl('/'); //Navigate root if no product found or not loaded
      }
    })
  }

  update(product: FinancialProduct){
    this.financialProductState.updateProduct(product);

  }
  
}
