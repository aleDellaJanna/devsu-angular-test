import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';
import { DatePipe, JsonPipe } from '@angular/common';
import { InputUiComponent } from '../../../shared/ui-design-system/form/input-ui.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../ui-components/search-bar/search-bar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [JsonPipe, InputUiComponent, DatePipe, FormsModule, SearchBarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly fincialProductsState = inject(FinancialProductsState);

  protected products = computed(() => this.fincialProductsState.products());
  protected loading = computed(() => this.fincialProductsState.loading());
  protected error = computed(() => this.fincialProductsState.error());

  searchTerm = signal('');
  constructor() {
    this.fincialProductsState.getFinancialProducts();
  }

  private readonly viewModel = computed(() => {
    return {
      products: this.products().filter(product => 
        product.name.toLowerCase().includes(this.searchTerm().toLowerCase()) 
        || product.description.toLowerCase().includes(this.searchTerm().toLowerCase())),
      loading: this.loading(),
      error: this.error()
    }
  })

  public get vm() {
    return this.viewModel();
  }
}
