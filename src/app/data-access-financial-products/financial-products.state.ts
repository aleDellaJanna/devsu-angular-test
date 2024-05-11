import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { FinancialProduct } from '../type-database/financial-product.type';
import { FinancialProductsService } from './financial-products.service';
import { Subject, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
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
  public refetch = new Subject<void>(); //Can be used from components to trigger refetch.
  private readonly reftechProducts = toSignal(this.refetch);
  
  private readonly financialProductsService = inject(FinancialProductsService);
  private router = inject(Router);
  //fincialProducState
  public state = signal<State>({
    error: null,
    products: [],
    loaded: false,
    loading: false
  })

  //Selectors for state
  public products = computed(() => this.state().products);
  public error = computed(() => this.state().error);
  public loaded = computed(() => this.state().loaded);
  public loading = computed(() => this.state().loading);

  constructor() {
    this.getFinancialProducts(); //Will only execute ocne;
    this.refetch.pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: ()=>this.getFinancialProducts()
    })

  }



  public getFinancialProducts() {
    this.state.update((state) => ({ ...state, loading: true }))
    this.financialProductsService.get().subscribe({
      next: (products) => {
        this.state.update((state) => ({ ...state, products, loading: false, loaded: true }))
        
      },
      error: (err) => {
        console.log("Error:", err);
        this.state.update((state) => ({ ...state, loading: false, error: 'Error al obtener los productos', loaded: false }))
      }
    });
  }

  public updateProduct(product: FinancialProduct) {
    this.state.update((state) => ({ ...state, loading: true }))
    this.financialProductsService.updateProduct(product).subscribe({
      next: (updatedProduct) => {
        this.state.update((state) => ({
          ...state,
          products: state.products.map(product => product.id === updatedProduct.id ? { ...updatedProduct } : product),
          loading: false, loaded: true
        }));
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.state.update((state) => ({ ...state, loading: false, error: 'Error al actualizar el productos', loaded: false }))
      }
    })
    setTimeout(() => {
      
      console.log(this.state())
    }, 500);

  }

  public deleteProduct(deleteProduct: FinancialProduct) {
    this.state.update((state) => ({ ...state, loading: true }))
    this.financialProductsService.deleteProduct(deleteProduct.id).subscribe({
      next: () => {
        this.state.update((state) => ({
          ...state,
          products: state.products.filter(product => product.id !== deleteProduct.id),
          loading: false, loaded: true
        }));
      },
      error: (err: HttpErrorResponse) => {
        //API response as error when succesufly delete  with status 200, so following guide...
        console.log(err)
        if(err.status===200){
          this.state.update((state) => ({
            ...state,
            products: state.products.filter(product => product.id !== deleteProduct.id),
            loading: false, loaded: true
          }));
        }else{

          this.state.update((state) => ({ ...state, loading: false, error: `Error al eliminar el producto ${deleteProduct.name}`, loaded: false }))
        }
      }
    })
  }
}
