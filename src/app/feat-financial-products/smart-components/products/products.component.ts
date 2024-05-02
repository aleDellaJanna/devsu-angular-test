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

@Component({
  standalone: true,
  imports: [JsonPipe, DatePipe, FormsModule, SearchBarComponent, SelectUiComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly fincialProductsState = inject(FinancialProductsState);

  protected products = computed(() => [...this.fincialProductsState.products(),  {
    id: "121321",
    name: "1",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "2",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "3",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "4",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "5",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "6",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "7",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "8",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "9",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "10",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  },
  {
    id: "121321",
    name: "11",
    description: "Core i5 10 generacion",
    logo: "https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/Consumidores/escoge-tu-tarjeta/credito/credito-world/1280x720-mc-sym-card-wrld-ci-5BIN-mm.png",
    date_release: "2024-04-30T00:00:00.000+00:00",
    date_revision: "2024-05-01T00:00:00.000+00:00"
  }]);
  protected loading = computed(() => this.fincialProductsState.loading());
  protected error = computed(() => this.fincialProductsState.error());

  searchTerm = signal('');
  protected itemsPerPage = signal<number>(5);
  protected pageIndex = signal(1);
  protected startIndex = computed(()=>(this.pageIndex()-1)*this.itemsPerPage())

  protected totalProducts = computed(()=>this.products().length)
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
      totalProducts: this.totalProducts()
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
