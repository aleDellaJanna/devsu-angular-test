import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FinancialProduct } from '../type-database/financial-product.type';

export interface FinancialProductsState {
  products: FinancialProduct[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class FinancialProductsService {
  private readonly http = inject(HttpClient);


  constructor() { }
}
