import { Injectable, computed, inject, signal } from '@angular/core';
import { FinancialProduct } from '../type-database/financial-product.type';
import { FinancialProductsService } from './financial-products.service';
import { tap } from 'rxjs';
export interface State {
  products: FinancialProduct[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class FinancialProductsState {
  
  private readonly financialProductsService = inject(FinancialProductsService)
  //fincialProducState
  private state = signal<State>({
    error: null,
    products: [],
    loaded: false,
    loading: false
  })

  //Selectors for state
  public readonly products = computed(()=>this.state().products);
  public readonly error = computed(()=>this.state().error);
  public readonly loaded = computed(()=>this.state().loaded);
  public readonly loading = computed(()=>this.state().loading);

  constructor() { }


  public getFinancialProducts(){
    this.state.update((state)=>({...state, loading: true}))
    this.financialProductsService.get().subscribe({
      next: (products) => this.state.update((state)=>({...state, products, loading: false})),
      error: (err) => {
        console.log("Error:", err);
        this.state.update((state)=>({...state,loading: false,error: 'Error al obtener los productos'}))
      }
    })
  }
}
