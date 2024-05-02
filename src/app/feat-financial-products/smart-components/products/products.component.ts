import { Component, computed, inject, signal } from '@angular/core';
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

@Component({
  standalone: true,
  imports: [DatePipe, FormsModule, SearchBarComponent, SelectUiComponent, RouterLink, ButtonUiComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly fincialProductsState = inject(FinancialProductsState);

  products = computed(() => this.fincialProductsState.products());
  protected loading = computed(() => this.fincialProductsState.loading());
  protected error = computed(() => this.fincialProductsState.error());

  searchTerm = signal('');
  itemsPerPage = signal<number>(5);
  protected pageIndex = signal(1);
  protected startIndex = computed(()=>(this.pageIndex()-1)*this.itemsPerPage())
  
  protected totalProducts = computed(()=>this.products().length)
  protected displayItems = computed(()=>this.itemsPerPage()*this.pageIndex()<=this.totalProducts()?this.itemsPerPage()*this.pageIndex():this.totalProducts())
  constructor() {
    this.fincialProductsState.getFinancialProducts();
  }

  private readonly viewModel = computed(() => {
    const products = this.products();
    const searchTerm  = this.searchTerm().toLowerCase();
    const startIndex = this.startIndex();
    const endIndex = this.startIndex()+this.itemsPerPage();
    
    //If any of the signals changes, we filter the products
    return {
      products: this.filterProducts(products,searchTerm,startIndex,endIndex),
      loading: this.loading(),
      error: this.error(),
      totalProducts: this.totalProducts(),
      displayItems: this.displayItems(),
      startIndex
    }
  })

  public get vm() {
    return this.viewModel();
  }
  nextPage(){
    if(this.pageIndex()*this.itemsPerPage()<this.totalProducts())
    this.pageIndex.update((val)=>val+1)
  }
  prevPage(){
    if(this.pageIndex()>1)
    this.pageIndex.update((val)=>val-1)
  }

  filterProducts(products: FinancialProduct[], searchTerm: string, startIndex: number, endIndex: number){
   return products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        || product.description.toLowerCase().includes(searchTerm.toLowerCase())).slice(startIndex,endIndex)
      }
}
