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
    return this.http.get<FinancialProduct[]>(`${this.baseUrl}`, {
      headers: {
        'authorId': '1'
      }
    }).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse): Observable<never>{
    return throwError(()=>error)
  }

}
