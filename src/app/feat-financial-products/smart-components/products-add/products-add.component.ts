import { Component, inject, signal } from '@angular/core';
import { ProductFormComponent } from '../../ui-components/product-form/product-form.component';
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { FinancialProduct } from '../../../type-database/financial-product.type';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-add',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.scss'
})
export class ProductsAddComponent {
  private readonly financialProductService = inject(FinancialProductsService);
  private readonly financialProductState = inject(FinancialProductsState);
  private readonly router = inject(Router);
  protected readonly error = signal<string | null>(null)
  save(product: FinancialProduct){
    console.log(product)
    this.financialProductService.createProduct(product).subscribe(
      ({
        next: (val)=>{this.financialProductState.refetch.next();
          this.router.navigateByUrl('/')
        },
        error: (err)=>{
          this.error.set(err.message)}
      }
    ))
  }
}
