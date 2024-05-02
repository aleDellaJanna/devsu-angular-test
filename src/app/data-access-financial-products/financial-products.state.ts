import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { FinancialProduct } from '../type-database/financial-product.type';
import { FinancialProductsService } from './financial-products.service';
import { Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
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
  public state = signal<State>({
    error: null,
    products: [],
    loaded: false,
    loading: false
  })

  //Selectors for state
  public products = computed(()=>this.state().products);
  public error = computed(()=>this.state().error);
  public loaded = computed(()=>this.state().loaded);
  public loading = computed(()=>this.state().loading);

  public refetch = new Subject<void>();
  private readonly refetchSignal = toSignal(this.refetch);
  constructor(){
    effect(()=>{
      if(this.refetchSignal()){
        this.getFinancialProducts()
      }
    })
  }



  public getFinancialProducts(){
    this.state.update((state)=>({...state, loading: true}))
    this.financialProductsService.get().subscribe({
      next: (products) => this.state.update((state)=>({...state, products, loading: false, loaded: true})),
      error: (err) => {
        console.log("Error:", err);
        this.state.update((state)=>({...state,loading: false,error: 'Error al obtener los productos', loaded: false}))
      }
    })
  }
}
