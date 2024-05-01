import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';
import { DatePipe, JsonPipe } from '@angular/common';
import { InputUiComponent } from '../../../shared/ui-design-system/form/input-ui.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [JsonPipe, InputUiComponent, DatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly fincialProductsState = inject(FinancialProductsState);
  protected products = computed(()=>this.fincialProductsState.products());
  protected loading = computed(()=>this.fincialProductsState.loading())
  protected error = computed(()=>this.fincialProductsState.error())


  constructor(){
    this.fincialProductsState.getFinancialProducts();
  }

  private readonly viewModel = computed(()=>{
    return {
      products: this.products(),
      loading: this.loading(),
      error: this.error()
    }
  })

  protected get vm(){
    return this.viewModel();
  }
}
