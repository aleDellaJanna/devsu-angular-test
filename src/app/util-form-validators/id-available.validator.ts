import { Injector } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { FinancialProductsService } from '../data-access-financial-products/financial-products.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
export function idAvailableValidator(
  financialService: FinancialProductsService,
): AsyncValidatorFn {
  return (control: AbstractControl) => {
      return timer(1000).pipe(
          switchMap(() =>
            financialService.checkIdAvailable(control.value)
              .pipe(
                map((isAvailable) => (!isAvailable ? null : { idAvailable: true })),
                catchError(() => of(null)))

              )
      );
  };
}
// export const idAvailableValidator: ValidatorFn = (
//   control: AbstractControl
// ): Observable<ValidationErrors | null> => {
//   const injector = Injector.create(
//     {

//         providers: [
//           {provide: HttpClient, useClass: HttpClient},
          
//             { provide: FinancialProductsService, useClass: FinancialProductsService },
//         ],
        
//     }
//   );
//   return injector
//     .get(FinancialProductsService)
//     .checkIdAvailable(control.value)
//     .pipe(
//       map((isAvailable) => (isAvailable ? null : { idAvailable: true })),
//       catchError(() => of(null))
//     );
// };