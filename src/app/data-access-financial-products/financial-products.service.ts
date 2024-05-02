import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

      tap(data=>console.log(data)),
      catchError(this.handleError)
    )
  }

  createProduct(financialProduct: FinancialProduct){
    return this.http.post<FinancialProduct>(`${this.baseUrl}`,financialProduct).pipe(
      tap(data=>console.log(data)),
      catchError(this.handleError)
    )
  }
  checkIdAvailable(id: string){
    return this.http.get<boolean>(`${this.baseUrl}/verification?id=${id}`).pipe(
      tap(data=>console.log(data)),
      catchError(this.handleError)
    )
  }
  handleError(error: HttpErrorResponse): Observable<never>{
    return throwError(()=>error)
  }

}
