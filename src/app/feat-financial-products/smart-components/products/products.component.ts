import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { FinancialProductsService } from '../../../data-access-financial-products/financial-products.service';
import { FinancialProductsState } from '../../../data-access-financial-products/financial-products.state';
import { DatePipe, JsonPipe } from '@angular/common';
import { InputUiComponent } from '../../../shared/ui-design-system/form/input-ui.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../ui-components/search-bar/search-bar.component';
import { SelectUiComponent } from '../../../shared/ui-design-system/form/select-ui.component';
import { FinancialProduct } from '../../../type-database/financial-product.type';
import { RouterLink } from '@angular/router';
import { ButtonUiComponent } from '../../../shared/ui-design-system/button-ui.component';
import { ProductTableItemComponent } from '../../ui-components/product-table-item/product-table-item.component';
import { DeleteModalUiComponent } from '../../../shared/delete-modal/delete-modal.ui-component';

@Component({
  standalone: true,
  imports: [DatePipe, FormsModule, SearchBarComponent, SelectUiComponent, RouterLink, ButtonUiComponent, ProductTableItemComponent, DeleteModalUiComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  private readonly fincialProductsState = inject(FinancialProductsState);

  //Selectors from state
  protected products = computed(() => this.fincialProductsState.products());
  protected loading = computed(() => this.fincialProductsState.loading());
  protected error = computed(() => this.fincialProductsState.error());

  //Delete feat
  protected openDeleteModal = signal(false);
  productSelectedForDelete = signal<FinancialProduct | null>(null)

  //Paginators & search bar feat
  searchTerm = signal('');
  itemsPerPage = signal<number>(5);
  protected pageIndex = signal(1);
  protected startIndex = computed(() => (this.pageIndex() - 1) * this.itemsPerPage())
  protected totalProducts = computed(() => this.products().length);
  protected displayItems = computed(() => this.itemsPerPage() * this.pageIndex() <= this.totalProducts() ? this.itemsPerPage() * this.pageIndex() : this.totalProducts())

  private readonly viewModel = computed(() => {
    const products = this.products();
    const searchTerm = this.searchTerm().toLowerCase();
    const startIndex = this.startIndex();
    const endIndex = this.startIndex() + this.itemsPerPage();

    //If any of the signals changes, we filter the products
    return {
      products: this.filterProducts(products, searchTerm, startIndex, endIndex),
      loading: this.loading(),
      error: this.error(),
      totalProducts: this.totalProducts(),
      displayItems: this.displayItems(),
      startIndex,
      openDeleteModal: this.openDeleteModal()
    }
  })

  public get vm() {
    return this.viewModel();
  }

  //Paginator methods
  nextPage() {
    if (this.pageIndex() * this.itemsPerPage() < this.totalProducts())
      this.pageIndex.update((val) => val + 1)
  }
  prevPage() {
    if (this.pageIndex() > 1)
      this.pageIndex.update((val) => val - 1)
  }

  filterProducts(products: FinancialProduct[], searchTerm: string, startIndex: number, endIndex: number) {
    return products
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
        || product.description.toLowerCase().includes(searchTerm.toLowerCase())).slice(startIndex, endIndex)
  }

  //Used for delete feature
  openModal(product: FinancialProduct) {
    this.productSelectedForDelete.set(product);
    this.openDeleteModal.set(true);
  }

  deleteProduct() {
    if (this.productSelectedForDelete()) {

      this.fincialProductsState.deleteProduct(this.productSelectedForDelete()!)
      this.openDeleteModal.set(false)
    }
  }
}
