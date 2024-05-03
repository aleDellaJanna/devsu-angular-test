import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { FinancialProduct } from '../type-database/financial-product.type';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FinancialProductsService {
  private readonly http = inject(HttpClient);
  baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'

  constructor() { }

  get(){
    return this.http.get<FinancialProduct[]>(`${this.baseUrl}`).pipe(

      catchError(this.handleError)
    )
  }
  updateProduct(financialProduct: FinancialProduct){
    return this.http.put<FinancialProduct>(`${this.baseUrl}`,financialProduct).pipe(
      catchError(this.handleError)
    )
  }

  deleteProduct(id: string){
    return this.http.delete<boolean>(`${this.baseUrl}?id=${id}`).pipe(
      catchError(this.handleError)
    )
  }

  createProduct(financialProduct: FinancialProduct){
    return this.http.post<FinancialProduct>(`${this.baseUrl}`,financialProduct).pipe(
      catchError(this.handleError)
    )
  }
  checkIdAvailable(id: string){
    return this.http.get<boolean>(`${this.baseUrl}/verification?id=${id}`).pipe(
      catchError(this.handleError)
    )
  }
  handleError(error: HttpErrorResponse): Observable<never>{
    return throwError(()=>error)
  }

}
